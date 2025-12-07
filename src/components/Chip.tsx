import React from 'react';
import './Chip.css';

interface ChipProps {
  label: string;
  variant?: 'default' | 'outline' | 'ghost';
  color?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';
  onClick?: () => void;
  onDelete?: () => void;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  variant = 'default',
  color = 'neutral',
  onClick,
  onDelete,
  className = '',
}) => {
  return (
    <div
      className={`chip chip--${variant} chip--${color} ${onClick ? 'chip--clickable' : ''} ${className}`}
      onClick={onClick}
    >
      <span className="chip__label">{label}</span>
      {onDelete && (
        <button
          className="chip__delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          aria-label="Remove"
        >
          ×
        </button>
      )}
    </div>
  );
};
