import React from 'react';
import './Paper.css';

interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  elevation?: 'none' | 'sm' | 'md' | 'lg';
}

export const Paper: React.FC<PaperProps> = ({
  children,
  elevation = 'md',
  className = '',
  ...props
}) => {
  return (
    <div className={`paper paper--elevation-${elevation} ${className}`} {...props}>
      {children}
    </div>
  );
};
