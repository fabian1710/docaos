import React, { useState } from 'react';
import { Paper } from '../components/Paper';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import './Login.css';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Login functionality coming soon!');
    }, 1500);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">docaos</h1>
          <p className="login-subtitle">Document Chaos Organizer</p>
        </div>
        
        <Paper className="login-form-paper" elevation="lg">
          <form onSubmit={handleLogin} className="login-form">
            <h2 className="form-title">Welcome back</h2>
            <p className="form-subtitle">Please enter your details to sign in.</p>
            
            <div className="form-fields">
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
              />
            </div>
            
            <Button type="submit" fullWidth isLoading={isLoading} size="lg">
              Sign in
            </Button>
            
            <div className="form-footer">
              <span className="text-muted">Don't have an account?</span>
              <Button variant="ghost" size="sm" type="button">Sign up</Button>
            </div>
          </form>
        </Paper>
      </div>
    </div>
  );
};
