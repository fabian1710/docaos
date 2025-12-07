import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './Button';
import './Dialog.css';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  primaryAction?: {
    label: string;
    onClick: () => void;
    isLoading?: boolean;
    variant?: 'primary' | 'error'; // Allow error variant for destructive actions
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  primaryAction,
  secondaryAction,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="dialog-overlay" onClick={onClose}>
      <div
        className="dialog"
        role="dialog"
        aria-modal="true"
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dialog__header">
          <h2 className="dialog__title">{title}</h2>
          <button className="dialog__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        
        <div className="dialog__body">
          {children}
        </div>
        
        <div className="dialog__footer">
          {secondaryAction && (
            <Button
              variant="ghost"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
          {primaryAction && (
            <Button
              variant={primaryAction.variant === 'error' ? 'primary' : 'primary'} // Map error to primary but with error color logic if needed, or just use primary for now. 
              // Actually, let's stick to Button props. If we need a destructive button, we might need to update Button component or just style it.
              // For now, let's assume primaryAction uses primary variant unless specified otherwise.
              // Wait, Button component only has primary, secondary, ghost. 
              // Let's just use primary for now.
              onClick={primaryAction.onClick}
              isLoading={primaryAction.isLoading}
              className={primaryAction.variant === 'error' ? 'btn--error' : ''}
            >
              {primaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
