import React from 'react';
import { FolderStack, type FolderTabItem } from './FolderStack';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
  activeTab?: 'dashboard' | 'documents' | 'design-system';
  onTabChange?: (tab: 'dashboard' | 'documents' | 'design-system') => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeTab = 'dashboard',
  onTabChange 
}) => {
  const tabs: FolderTabItem[] = [
    { id: 'dashboard', label: 'Dashboard', color: 'var(--color-folder-manila)', icon: '📊' },
    { id: 'documents', label: 'Documents', color: 'var(--color-folder-blue)', icon: '📁' },
    { id: 'design-system', label: 'System', color: 'var(--color-folder-pink)', icon: '🎨' },
  ];

  const handleTabChange = (id: string) => {
    onTabChange?.(id as 'dashboard' | 'documents' | 'design-system');
  };

  return (
    <div className="layout">
      <FolderStack 
        tabs={tabs} 
        activeTabId={activeTab} 
        onTabChange={handleTabChange} 
      />
      
      <main className="desk-surface">
        <div className="paper-sheet">
          {children}
        </div>
      </main>
      
      <div className="analogue-toolbar">
        <button className="tool-btn" title="Search">
          <span role="img" aria-label="Search">🔍</span>
        </button>
        <button className="tool-btn" title="Edit">
          <span role="img" aria-label="Edit">✏️</span>
        </button>
        <button className="tool-btn" title="Attach">
          <span role="img" aria-label="Attach">📎</span>
        </button>
      </div>
    </div>
  );
};
