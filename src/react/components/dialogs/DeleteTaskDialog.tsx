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
      <button onClick={() => setIsOpen(true)}><Trash/></button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div style={{
          position: 'fixed', inset: 0, 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.15)', 
          zIndex: 50
        }}>
          <Dialog.Panel style={{
            maxWidth: '500px',
            background: 'white',
            padding: '2rem',
            borderRadius: '1rem',
            boxShadow: '0 4px 24px rgba(0,0,0,0.15)'
          }}>
            <Dialog.Title style={{fontWeight: 'bold'}}>Delete task</Dialog.Title>
            <Dialog.Description>
              This will permanently delete the task
            </Dialog.Description>
            <p>Are you sure you want to delete the task?</p>
            <div style={{display: 'flex', gap: 12, marginTop: 18}}>
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={onConfirmation}>Delete</button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
