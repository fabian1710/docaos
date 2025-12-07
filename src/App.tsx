import { useState } from 'react';
import { Login } from './pages/Login';
import { DesignSystem } from './pages/DesignSystem';
import { Button } from './components/Button';

function App() {
  const [showDesignSystem, setShowDesignSystem] = useState(false);

  return (
    <div className="app">
      <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1000 }}>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowDesignSystem(!showDesignSystem)}
        >
          {showDesignSystem ? 'Back to App' : 'View Design System'}
        </Button>
      </div>
      
      {showDesignSystem ? <DesignSystem /> : <Login />}
    </div>
  );
}

export default App;
