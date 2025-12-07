import React from 'react';
import { Paper } from '../components/Paper';
import { UploadSection } from '../components/UploadSection';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Paper className="dashboard-content">
        <h1>Dashboard</h1>
        <p>Welcome to docaos.</p>
        
        <div style={{ marginTop: 'var(--spacing-6)' }}>
          <h2>Quick Upload</h2>
          <UploadSection />
        </div>
      </Paper>
    </div>
  );
};
