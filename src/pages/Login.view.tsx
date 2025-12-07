import React from 'react';
import { Paper } from '../components/Paper';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useLogin } from './Login.context';
import './Login.css';

export const Login: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    handleLogin,
  } = useLogin();

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">docaos</h1>
          <p className="login-subtitle">Est. 2025 • Document Chaos Organizer</p>
        </div>
        
        <Paper className="login-form-paper" elevation="md">
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-header">
              <h2 className="form-title">Authorized Access</h2>
              <p className="form-subtitle">Please identify yourself to access the archives.</p>
              {error && (
                <div className="login-error">
                  ERROR: {error.toUpperCase()}
                </div>
              )}
            </div>
            
            <div className="form-fields">
              <Input
                label="IDENTIFICATION (EMAIL)"
                type="email"
                placeholder="officer@docaos.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
              <Input
                label="SECURITY CLEARANCE (PASSWORD)"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
              />
            </div>
            
            <Button type="submit" fullWidth isLoading={isLoading} size="lg" variant="primary">
              AUTHENTICATE
            </Button>
            
            <div className="form-footer">
              <span className="text-muted">New personnel?</span>
              <Button variant="ghost" size="sm" type="button">Submit Application</Button>
            </div>
          </form>
        </Paper>
      </div>
    </div>
  );
};
