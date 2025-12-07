import { useState } from 'react';
import { Login } from './pages/Login';
import { DesignSystem } from './pages/DesignSystem';
import { Layout } from './components/Layout';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'documents' | 'design-system'>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'design-system':
        return <DesignSystem />;
      case 'dashboard':
      default:
        return <Login />; // Using Login as dashboard placeholder for now
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;
