import React from 'react';
import type { Document } from '../services/dataService';
import { Button } from './Button';
import { Paper } from './Paper';
import './DocumentList.css';

interface DocumentListProps {
  documents: Document[];
  onProcess: (id: string) => Promise<void>;
  onSelect?: (id: string) => void;
  isLoading?: boolean;
}

export const DocumentList: React.FC<DocumentListProps> = ({ 
  documents, 
  onProcess,
  onSelect,
  isLoading = false 
}) => {
  if (isLoading) {
    return <div className="document-list__loading">Loading documents...</div>;
  }

  if (documents.length === 0) {
    return (
      <div className="document-list__empty">
        <p>No documents in the inbox.</p>
      </div>
    );
  }

  return (
    <div className="document-list">
      {documents.map((doc) => (
        <Paper 
          key={doc.id} 
          className="document-item" 
          elevation="sm"
          onClick={() => onSelect?.(doc.id)}
          style={{ cursor: onSelect ? 'pointer' : 'default' }}
        >
          <div className="document-item__info">
            <h3 className="document-item__title">{doc.title}</h3>
            <div className="document-item__meta">
              <span className="document-item__date">
                {new Date(doc.created_at).toLocaleDateString()}
              </span>
              <span className="document-item__size">
                {doc.file_size ? `${(doc.file_size / 1024 / 1024).toFixed(2)} MB` : ''}
              </span>
            </div>
          </div>
          <div className="document-item__actions">
            {doc.status === 'inbox' && (
              <Button 
                size="sm" 
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  onProcess(doc.id);
                }}
              >
                Process
              </Button>
            )}
          </div>
        </Paper>
      ))}
    </div>
  );
};
