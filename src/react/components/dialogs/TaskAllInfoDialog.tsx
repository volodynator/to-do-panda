import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import type { Task } from '../../../model';
import { BookOpen } from 'lucide-react';
import { TaskEditorDialog } from './TaskEditorDialog';

interface TaskAllInfoDialogProps {
  task: Task
}


export function TaskAllInfoDialog({task}: TaskAllInfoDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="btn btn--outline btn--sm"
        style={{
        background: 'var(--color-info)'
      }}
        onClick={() => setIsOpen(true)}
      >
        <BookOpen/>
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
              {task.title}
            </Dialog.Title>

            <Dialog.Description
              style={{
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--font-size-base)',
                marginBottom: 'var(--space-12)',
              }}
            >
                <div>Category: {task.category}.</div>
                <div>Created on {task.createdDate}.</div>
                {task.completed ? <div>Completed on {task.doneDate}.</div> : ''}
                {task.dueDate ? <div>Due to {task.dueDate}.</div> : ''}
                Time spent: {Math.floor(task.timeSpent/60)} hours, {task.timeSpent % 60} minutes.
            </Dialog.Description>

            <div style={{
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--font-size-base)',
                marginBottom: 'var(--space-12)',
              }}>
                {task.description ? task.description : 'No description.'}
            </div>


            <div
              style={{
                gap: 'var(--space-12)',
                justifyContent: 'flex-end',
              }}
            >
                <TaskEditorDialog task={task}/>
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