import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { TaskEditor } from '../tasks';
import type { Task } from '../../../model';

interface TaskEditorProps {
  task: Task
}


export function TaskEditorDialog({task}: TaskEditorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
      className="btn btn--primary"
      style={{
        width: '100%'
      }}
        onClick={() => setIsOpen(true)}
      >
        Edit
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.3)',
            zIndex: 50,
          }}
        >
          <Dialog.Panel
            style={{
              maxWidth: '500px',
              width: '90%',
              background: 'var(--color-surface)',
              padding: 'var(--space-24)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--color-card-border)',
            }}
          >
            <Dialog.Title
              style={{
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-xl)',
                color: 'var(--color-text)',
                marginBottom: 'var(--space-12)',
                lineHeight: 'var(--line-height-tight)',
              }}
            >
              Edit task
            </Dialog.Title>

            <Dialog.Description
              style={{
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--font-size-base)',
                marginBottom: 'var(--space-8)',
              }}
            >
              Please edit the data
            </Dialog.Description>

            <TaskEditor task={task}/>

            <div
              style={{
                display: 'flex',
                gap: 'var(--space-12)',
                justifyContent: 'flex-end',
              }}
            >
              <button
                className="btn btn--primary"
                style={{
                  background: 'var(--color-error)',
                  width: '100%',
                  marginTop: 'var(--space-12)'
                }}
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}