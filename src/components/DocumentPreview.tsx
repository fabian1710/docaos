import React, { useState } from 'react';
import { Paper } from './Paper';
import './DocumentPreview.css';

interface DocumentPreviewProps {
  url: string | null;
  mimeType: string | null;
  title: string;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({ url, mimeType, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (!url) {
    return (
      <Paper className="document-preview document-preview--empty">
        <p>No preview available</p>
      </Paper>
    );
  }

  const handleLoad = () => setIsLoading(false);
  const handleError = (e: any) => {
    console.error('Preview failed to load:', e);
    setIsLoading(false);
    setHasError(true);
  };

  const renderContent = () => {
    if (mimeType?.startsWith('image/')) {
      return (
        <img 
          src={url} 
          alt={title} 
          className="document-preview__image"
          onLoad={handleLoad}
          onError={handleError}
        />
      );
    }

    if (mimeType === 'application/pdf') {
      return (
        <iframe 
          src={url} 
          title={title}
          className="document-preview__pdf"
          onLoad={handleLoad}
          onError={handleError}
        />
      );
    }

    return (
      <div className="document-preview__unsupported">
        <p>Preview not supported for this file type.</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="document-preview__link">
          Download File
        </a>
      </div>
    );
  };

  return (
    <Paper className="document-preview" elevation="md">
      {isLoading && !hasError && (
        <div className="document-preview__loading">
          Loading preview...
        </div>
      )}
      {hasError ? (
        <div className="document-preview__error">
          Failed to load preview.
        </div>
      ) : (
        renderContent()
      )}
    </Paper>
  );
};
