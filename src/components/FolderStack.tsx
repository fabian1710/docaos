import React from 'react';
import './FolderStack.css';

export interface FolderTabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  color?: string;
}

interface FolderStackProps {
  tabs: readonly FolderTabItem[];
  activeTabId: string;
  onTabChange: (id: string) => void;
  className?: string;
}

export const FolderStack: React.FC<FolderStackProps> = ({
  tabs,
  activeTabId,
  onTabChange,
  className = '',
}) => {
  return (
    <nav className={`folder-stack ${className}`}>
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          className={`folder-tab ${activeTabId === tab.id ? 'folder-tab--active' : ''}`}
          onClick={() => onTabChange(tab.id)}
          style={{ 
            '--tab-color': tab.color || 'var(--color-folder-manila)',
            zIndex: tabs.length - index, // Stack order: Top is highest
          } as React.CSSProperties}
        >
          <span className="folder-tab__label">{tab.label}</span>
          {tab.icon && <span className="folder-tab__icon">{tab.icon}</span>}
        </button>
      ))}
    </nav>
  );
};
