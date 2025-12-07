import React, { useState } from 'react';
import { FileUpload } from './FileUpload';
import { storageService } from '../services/storageService';
import { dataService } from '../services/dataService';
import { useAuth } from '../contexts/auth.context';

interface UploadSectionProps {
  folderId?: string | null;
  onUploadComplete?: () => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ 
  folderId = null,
  onUploadComplete 
}) => {
  const { session } = useAuth();
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    if (!session?.user) return;

    try {
      setUploadStatus('Uploading file...');
      const { path, error: uploadError } = await storageService.uploadFile(file);
      
      if (uploadError) throw uploadError;

      setUploadStatus('Creating document record...');
      await dataService.createDocument(
        file.name,
        folderId,
        {},
        {
          storage_path: path,
          mime_type: file.type,
          file_size: file.size
        }
      );

      setUploadStatus('Upload complete!');
      setTimeout(() => {
        setUploadStatus(null);
        onUploadComplete?.();
      }, 3000);
    } catch (error: any) {
      console.error('Upload failed:', error);
      setUploadStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="upload-section">
      <FileUpload onUpload={handleUpload} />
      {uploadStatus && (
        <p style={{ 
          marginTop: 'var(--spacing-2)', 
          fontFamily: 'var(--font-family-mono)',
          color: 'var(--color-text-muted)',
          textAlign: 'center',
          fontSize: 'var(--font-size-sm)'
        }}>
          {uploadStatus}
        </p>
      )}
    </div>
  );
};
