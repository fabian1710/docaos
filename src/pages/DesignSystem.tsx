import React, { useState } from 'react';
import { Paper } from '../components/Paper';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Chip } from '../components/Chip';
import { Dialog } from '../components/Dialog';
import './DesignSystem.css';

export const DesignSystem: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="design-system">
      <header className="ds-header">
        <h1>Design System</h1>
        <p>Overview of colors, typography, and components.</p>
      </header>

      <section className="ds-section">
        <h2>Colors</h2>
        <div className="ds-grid">
          <Paper className="ds-card">
            <h3>Backgrounds</h3>
            <div className="color-swatch" style={{ background: 'var(--color-bg-app)' }}>bg-app</div>
            <div className="color-swatch" style={{ background: 'var(--color-bg-surface)' }}>bg-surface</div>
            <div className="color-swatch" style={{ background: 'var(--color-bg-surface-hover)' }}>bg-surface-hover</div>
          </Paper>
          
          <Paper className="ds-card">
            <h3>Primary</h3>
            <div className="color-swatch" style={{ background: 'var(--color-primary)' }}>primary</div>
            <div className="color-swatch" style={{ background: 'var(--color-primary-hover)' }}>primary-hover</div>
            <div className="color-swatch" style={{ background: 'var(--color-primary-light)' }}>primary-light</div>
          </Paper>

          <Paper className="ds-card">
            <h3>Text</h3>
            <div className="color-swatch" style={{ background: 'var(--color-text-main)', color: '#000' }}>text-main</div>
            <div className="color-swatch" style={{ background: 'var(--color-text-muted)', color: '#000' }}>text-muted</div>
          </Paper>

          <Paper className="ds-card">
            <h3>Status</h3>
            <div className="color-swatch" style={{ background: 'var(--color-success)' }}>success</div>
            <div className="color-swatch" style={{ background: 'var(--color-error)' }}>error</div>
          </Paper>
        </div>
      </section>

      <section className="ds-section">
        <h2>Typography</h2>
        <Paper className="ds-card">
          <h1>Heading 1 (2.5rem)</h1>
          <h2>Heading 2 (2rem)</h2>
          <h3>Heading 3 (1.75rem)</h3>
          <h4>Heading 4 (1.5rem)</h4>
          <p>Body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p className="text-muted">Muted text. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </Paper>
      </section>

      <section className="ds-section">
        <h2>Components</h2>
        
        <div className="ds-grid">
          <Paper className="ds-card">
            <h3>Buttons</h3>
            <div className="ds-row">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className="ds-row">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="ds-row">
              <Button isLoading>Loading</Button>
              <Button disabled>Disabled</Button>
            </div>
            <div className="ds-row" style={{ width: '100%' }}>
              <Button fullWidth>Full Width</Button>
            </div>
          </Paper>

          <Paper className="ds-card">
            <h3>Inputs</h3>
            <div className="ds-col">
              <Input label="Default Input" placeholder="Type something..." />
              <Input label="With Error" error="This field is required" placeholder="Error state" />
              <Input label="Full Width" fullWidth placeholder="Occupies full width" />
            </div>
          </Paper>

          <Paper className="ds-card">
            <h3>Paper Elevations</h3>
            <div className="ds-row">
              <Paper elevation="none" className="p-4">None</Paper>
              <Paper elevation="sm" className="p-4">Small</Paper>
              <Paper elevation="md" className="p-4">Medium</Paper>
              <Paper elevation="lg" className="p-4">Large</Paper>
            </div>
          </Paper>

          <Paper className="ds-card">
            <h3>Chips</h3>
            <div className="ds-col">
              <div className="ds-row">
                <Chip label="Default" />
                <Chip label="Outline" variant="outline" />
                <Chip label="Ghost" variant="ghost" />
              </div>
              <div className="ds-row">
                <Chip label="Primary" color="primary" />
                <Chip label="Success" color="success" />
                <Chip label="Error" color="error" />
                <Chip label="Warning" color="warning" />
              </div>
              <div className="ds-row">
                <Chip label="Clickable" onClick={() => alert('Clicked!')} />
                <Chip label="Deletable" onDelete={() => alert('Delete!')} />
              </div>
            </div>
          </Paper>

          <Paper className="ds-card">
            <h3>Dialogs</h3>
            <div className="ds-row">
              <Button onClick={() => setIsDialogOpen(true)}>Open Dialog</Button>
            </div>
          </Paper>
        </div>
      </section>

      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Example Dialog"
        primaryAction={{
          label: 'Confirm',
          onClick: () => {
            alert('Confirmed');
            setIsDialogOpen(false);
          }
        }}
        secondaryAction={{
          label: 'Cancel',
          onClick: () => setIsDialogOpen(false)
        }}
      >
        <p>This is an example dialog content. It demonstrates the standard layout with a header, body content, and footer actions.</p>
        <p style={{ marginTop: '1rem' }}>The actions are aligned to the bottom right.</p>
      </Dialog>
    </div>
  );
};
