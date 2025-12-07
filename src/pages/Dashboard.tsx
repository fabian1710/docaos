import React from 'react';
import { Paper } from '../components/Paper';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Paper className="dashboard-content">
        <h1>Dashboard</h1>
        <p>Welcome to docaos.</p>
      </Paper>
    </div>
  );
};
