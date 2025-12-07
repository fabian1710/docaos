import React, { useCallback, useState } from 'react';
import './FileUpload.css';

interface FileUploadProps {
  onUpload: (file: File) => Promise<void>;
  accept?: string;
  maxSize?: number; // in bytes
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  accept = 'image/*,application/pdf',
  maxSize = 10 * 1024 * 1024, // 10MB default
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `File size exceeds ${maxSize / 1024 / 1024}MB limit.`;
    }
    // Simple check, browser input accept handles most
    return null;
  };

  const processFile = async (file: File) => {
    setError(null);
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsUploading(true);
    try {
      await onUpload(file);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        processFile(e.dataTransfer.files[0]);
      }
    },
    [onUpload, maxSize]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div
      className={`file-upload ${isDragging ? 'file-upload--dragging' : ''} ${error ? 'file-upload--error' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="file-upload-input"
        className="file-upload__input"
        accept={accept}
        onChange={handleFileSelect}
        disabled={isUploading}
      />
      
      <div className="file-upload__content">
        {isUploading ? (
          <div className="file-upload__status">
            <span className="file-upload__spinner" />
            <p>Archiving document...</p>
          </div>
        ) : (
          <>
            <div className="file-upload__icon">📎</div>
            <p className="file-upload__text">
              Drag & drop files here or{' '}
              <label htmlFor="file-upload-input" className="file-upload__label">
                browse
              </label>
            </p>
            <p className="file-upload__hint">Supports PDF, PNG, JPG up to 10MB</p>
          </>
        )}
        
        {error && <p className="file-upload__error-msg">{error}</p>}
      </div>
    </div>
  );
};
