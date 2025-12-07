import React, { useState } from 'react';
import { Paper } from '../components/Paper';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Chip } from '../components/Chip';
import { Dialog } from '../components/Dialog';
import { FolderStack } from '../components/FolderStack';
import './DesignSystem.css';

export const DesignSystem: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="design-system">
      <header className="ds-header">
        <h1>Analogue Librarian</h1>
        <p>A design system for digital tools with an analogue soul.</p>
      </header>

      <section className="ds-section">
        <h2>Colors & Surfaces</h2>
        <div className="ds-grid">
          <Paper className="ds-card">
            <h3>Surfaces</h3>
            <div className="color-swatch" style={{ background: 'var(--color-bg-app)', color: 'var(--color-text-main)' }}>Manila (App BG)</div>
            <div className="color-swatch" style={{ background: 'var(--color-bg-surface)', color: 'var(--color-text-main)' }}>Paper (Surface)</div>
            <div className="color-swatch" style={{ background: 'var(--color-bg-surface-hover)', color: 'var(--color-text-main)' }}>Archival Grey</div>
          </Paper>
          
          <Paper className="ds-card">
            <h3>Ink & Text</h3>
            <div className="color-swatch" style={{ background: 'var(--color-text-main)', color: '#fff' }}>Typewriter Black</div>
            <div className="color-swatch" style={{ background: 'var(--color-text-muted)', color: '#fff' }}>Faded Stamp</div>
            <div className="color-swatch" style={{ background: 'var(--color-text-accent)', color: '#fff' }}>Carbon Blue</div>
          </Paper>

          <Paper className="ds-card">
            <h3>Office Supplies</h3>
            <div className="color-swatch" style={{ background: 'var(--color-success)', color: '#fff' }}>Olive Green</div>
            <div className="color-swatch" style={{ background: 'var(--color-warning)', color: '#000' }}>Mustard Yellow</div>
            <div className="color-swatch" style={{ background: 'var(--color-error)', color: '#fff' }}>Alert Red</div>
          </Paper>
        </div>
      </section>

      <section className="ds-section">
        <h2>Typography</h2>
        <Paper className="ds-card">
          <h1>Heading 1 (Courier Prime)</h1>
          <h2>Heading 2 (Courier Prime)</h2>
          <h3>Heading 3 (Courier Prime)</h3>
          <h4>Heading 4 (Courier Prime)</h4>
          <p>Body text (Inter). The interface is digital, but the experience is tactile, warm, familiar — like opening a manila folder on an oak desk.</p>
          <p className="text-muted">Muted text. Aesthetically 1975, behaviorally 2025.</p>
          <div style={{ marginTop: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-family-label)', textTransform: 'uppercase', fontWeight: 'bold' }}>Label Font (Oswald)</span>
          </div>
        </Paper>
      </section>

      <section className="ds-section">
        <h2>Components</h2>
        
        <div className="ds-grid">
          <Paper className="ds-card">
            <h3>Buttons</h3>
            <div className="ds-row">
              <Button variant="primary">Primary Action</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className="ds-row">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="ds-row">
              <Button isLoading>Processing</Button>
              <Button disabled>Disabled</Button>
            </div>
            <div className="ds-row" style={{ width: '100%' }}>
              <Button fullWidth>Full Width Button</Button>
            </div>
          </Paper>

          <Paper className="ds-card">
            <h3>Form Fields</h3>
            <div className="ds-col">
              <Input label="Document Title" placeholder="Enter title..." />
              <Input label="Required Field" error="This field is required" placeholder="Error state" />
              <Input label="Full Width Input" fullWidth placeholder="Occupies full width" />
            </div>
          </Paper>

          <Paper className="ds-card">
            <h3>Chips & Labels</h3>
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
              <Button onClick={() => setIsDialogOpen(true)}>Open Index Card</Button>
            </div>
          </Paper>

          <Paper className="ds-card">
            <h3>Folder Stack</h3>
            <div style={{ position: 'relative', height: '300px', border: '1px dashed var(--color-border)', overflow: 'hidden' }}>
              <FolderStack
                tabs={[
                  { id: '1', label: 'Project A', color: 'var(--color-folder-manila)', icon: '📁' },
                  { id: '2', label: 'Finances', color: 'var(--color-folder-blue)', icon: '💰' },
                  { id: '3', label: 'Ideas', color: 'var(--color-folder-pink)', icon: '💡' },
                ]}
                activeTabId="1"
                onTabChange={(id: string) => console.log(id)}
                className="ds-folder-stack-demo"
              />
            </div>
          </Paper>
        </div>
      </section>

      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="CONFIRM ACTION"
        primaryAction={{
          label: 'APPROVE',
          onClick: () => {
            alert('Approved');
            setIsDialogOpen(false);
          }
        }}
        secondaryAction={{
          label: 'CANCEL',
          onClick: () => setIsDialogOpen(false)
        }}
      >
        <p>This is an example dialog content. It looks like an index card or a typed note.</p>
        <p style={{ marginTop: '1rem' }}>Are you sure you want to proceed with this action?</p>
      </Dialog>
    </div>
  );
};
