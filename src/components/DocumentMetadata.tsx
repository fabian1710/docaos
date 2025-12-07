import React, { useState } from 'react';
import type { Document } from '../services/dataService';
import { Paper } from './Paper';
import { Input } from './Input';
import { Button } from './Button';
import './DocumentMetadata.css';

interface DocumentMetadataProps {
  document: Document;
  onSave: (updates: Partial<Document>) => Promise<void>;
}

export const DocumentMetadata: React.FC<DocumentMetadataProps> = ({ document, onSave }) => {
  // Title is now handled in parent
  const [tags, setTags] = useState<string[]>(document.tags || []);
  const [newTag, setNewTag] = useState('');
  const [documentType, setDocumentType] = useState(document.document_type || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave({
        tags, // Send array directly
        document_type: documentType || null
      });
    } catch (error) {
      console.error('Failed to save metadata:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()]);
      }
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <Paper className="document-metadata" elevation="sm">
      <div className="document-metadata__header">
        <h2>Metadata</h2>
      </div>
      
      <div className="document-metadata__form">
        <div className="form-group">
          <label htmlFor="type">Document Type</label>
          <select
            id="type"
            className="input"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            style={{ width: '100%', height: '40px' }}
          >
            <option value="">Select Type...</option>
            <option value="Invoice">Invoice</option>
            <option value="Receipt">Receipt</option>
            <option value="Contract">Contract</option>
            <option value="Statement">Statement</option>
            <option value="Letter">Letter</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Tags</label>
          <div className="tags-container">
            {tags.map(tag => (
              <div key={tag} className="sticky-note">
                {tag}
                <button 
                  className="sticky-note__remove"
                  onClick={() => removeTag(tag)}
                >
                  ×
                </button>
              </div>
            ))}
            <input
              className="tags-input"
              placeholder="+ Add tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleAddTag}
            />
          </div>
        </div>

        <div className="document-metadata__info">
          <div className="info-item">
            <span className="info-label">Created</span>
            <span className="info-value">{new Date(document.created_at).toLocaleString()}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Size</span>
            <span className="info-value">
              {document.file_size ? `${(document.file_size / 1024 / 1024).toFixed(2)} MB` : 'Unknown'}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Type</span>
            <span className="info-value">{document.mime_type || 'Unknown'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Status</span>
            <span className="info-value status-badge">{document.status}</span>
          </div>
        </div>

        <div className="document-metadata__actions">
          <Button onClick={handleSave} isLoading={isSaving} fullWidth>
            Save Changes
          </Button>
        </div>
      </div>
    </Paper>
  );
};
