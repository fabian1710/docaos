import React, { useEffect, useState } from 'react';
import { DocumentPreview } from '../components/DocumentPreview';
import { DocumentMetadata } from '../components/DocumentMetadata';
import { dataService, type Document } from '../services/dataService';
import { storageService } from '../services/storageService';
import { Button } from '../components/Button';
import './DocumentDetail.css';

interface DocumentDetailProps {
  documentId: string;
  onBack: () => void;
}

export const DocumentDetail: React.FC<DocumentDetailProps> = ({ documentId, onBack }) => {
  const [document, setDocument] = useState<Document | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // 1. Fetch Document Data
        const docs = await dataService.getDocuments(); // Inefficient but simple for now
        const doc = docs.find(d => d.id === documentId);
        
        if (!doc) throw new Error('Document not found');
        setDocument(doc);

        // 2. Fetch File URL
        if (doc.storage_path) {
          const url = await storageService.createSignedUrl(doc.storage_path);
          setFileUrl(url);
        }
      } catch (error) {
        console.error('Error loading document:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [documentId]);

  const handleSaveMetadata = async (updates: Partial<Document>) => {
    if (!document) return;
    try {
      console.log('Saving metadata updates:', updates);
      const updatedDoc = await dataService.updateDocument(document.id, updates);
      console.log('Save successful:', updatedDoc);
      
      // Optimistic update
      setDocument({ ...document, ...updates });
    } catch (error) {
      console.error('Error saving metadata:', error);
    }
  };

  if (isLoading) {
    return <div className="document-detail__loading">Loading document...</div>;
  }

  if (!document) {
    return <div className="document-detail__error">Document not found.</div>;
  }

  return (
    <div className="document-detail">
      <div className="document-detail__toolbar">
        <Button variant="secondary" onClick={onBack}>
          ← Back
        </Button>
        <input 
          className="document-detail__title-input"
          value={document.title}
          onChange={(e) => setDocument({ ...document, title: e.target.value })}
          onBlur={(e) => handleSaveMetadata({ title: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.currentTarget.blur();
            }
          }}
        />
      </div>

      <div className="document-detail__content">
        <div className="document-detail__preview">
          <DocumentPreview 
            url={fileUrl} 
            mimeType={document.mime_type} 
            title={document.title} 
          />
        </div>
        <div className="document-detail__metadata">
          <DocumentMetadata 
            document={document} 
            onSave={handleSaveMetadata} 
          />
          
          {/* AI Analysis Section */}
          {document.metadata && (document.metadata as any).ai_analysis && (
            <div className="ai-analysis-panel">
              <h3>AI Analysis</h3>
              <div className="ai-content">
                <p><strong>Summary:</strong> {(document.metadata as any).ai_analysis.summary}</p>
                <p><strong>Category:</strong> {(document.metadata as any).ai_analysis.category}</p>
                <p><strong>Entities:</strong> {(document.metadata as any).ai_analysis.entities?.join(', ')}</p>
                <p><strong>Date:</strong> {(document.metadata as any).ai_analysis.date}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
