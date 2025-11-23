import { Dialog } from '@headlessui/react';
import { Trash } from 'lucide-react';
import { useState } from 'react';

interface DeleteTaskDialogProps {
  onConfirmation: () => Promise<void>; 
}

export function DeleteTaskDialog({onConfirmation}: DeleteTaskDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
  <>
    <button 
      className="btn btn--outline btn--sm" 
      onClick={() => setIsOpen(true)}
    >
      <Trash/>
    </button>
    
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div style={{
        position: 'fixed', 
        inset: 0, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.3)',
        zIndex: 50
      }}>
        <Dialog.Panel style={{
          maxWidth: '500px',
          width: '90%',
          background: 'var(--color-surface)',
          padding: 'var(--space-24)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--color-card-border)'
        }}>
          <Dialog.Title style={{
            fontWeight: 'var(--font-weight-semibold)',
            fontSize: 'var(--font-size-xl)',
            color: 'var(--color-text)',
            marginBottom: 'var(--space-12)',
            lineHeight: 'var(--line-height-tight)'
          }}>
            Delete task
          </Dialog.Title>
          
          <Dialog.Description style={{
            color: 'var(--color-text-secondary)',
            fontSize: 'var(--font-size-base)',
            marginBottom: 'var(--space-8)'
          }}>
            This will permanently delete the task
          </Dialog.Description>
          <p style={{
            color: 'var(--color-text)',
            fontSize: 'var(--font-size-base)',
            marginBottom: 'var(--space-20)'
          }}>
            Are you sure you want to delete the task?
          </p>

          <div style={{
            display: 'flex', 
            gap: 'var(--space-12)', 
            justifyContent: 'flex-end'
          }}>
            <button 
              className="btn btn--secondary"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button 
              className="btn btn--primary" 
              style={{
                background: 'var(--color-error)',
                color: 'white'
              }}
              onClick={onConfirmation}
            >
              Delete
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  </>
)

}
