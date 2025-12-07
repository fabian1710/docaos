import React, { useEffect, useState } from 'react';
import { Paper } from '../components/Paper';
import { useAuth } from '../contexts/auth.context';
import { UploadSection } from '../components/UploadSection';
import { DocumentList } from '../components/DocumentList';
import { dataService, type Document } from '../services/dataService';
import './Dashboard.css';

interface DashboardProps {
  onSelectDocument?: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectDocument }) => {
  const { session } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDocuments = async () => {
    if (!session?.user) return;
    try {
      const docs = await dataService.getDocuments();
      setDocuments(docs);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [session]);

  const handleProcess = async (id: string) => {
    try {
      await dataService.updateDocumentStatus(id, 'processed');
      // Refresh list
      await fetchDocuments();
    } catch (error) {
      console.error('Error processing document:', error);
    }
  };

  return (
    <div className="dashboard">
      <Paper className="dashboard-content">
        <h1>Dashboard</h1>
        <p>Welcome to docaos.</p>
        
        <div style={{ marginTop: 'var(--spacing-6)' }}>
          <h2>Quick Upload</h2>
          <UploadSection onUploadComplete={fetchDocuments} />
        </div>

        <div style={{ marginTop: 'var(--spacing-8)' }}>
          <h2>Inbox</h2>
          <DocumentList 
            documents={documents.filter(d => d.status === 'inbox')} 
            onProcess={handleProcess}
            onSelect={onSelectDocument}
            isLoading={isLoading}
          />
        </div>
      </Paper>
    </div>
  );
};
