import { useState } from 'react';
import { Login } from './pages/Login.view';
import { Dashboard } from './pages/Dashboard';
import { DesignSystem } from './pages/DesignSystem';
import { Layout } from './components/Layout';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const { session, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'documents' | 'design-system'>('dashboard');

  if (isLoading) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'var(--color-bg-app)',
        backgroundImage: 'var(--texture-paper-grain)'
      }}>
        Loading...
      </div>
    );
  }

  if (!session) {
    return <Login />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'design-system':
        return <DesignSystem />;
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
