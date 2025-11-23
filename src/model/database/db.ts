import Dexie, { type EntityTable } from 'dexie';
import type { Priority, Task } from '../types';

const db = new Dexie('TasksDatabase') as Dexie & {
  tasks: EntityTable<Task, 'id'>;
  priorities: EntityTable<Priority, 'name'>;
};

// Schema declaration:
db.version(2).stores({
  tasks:
    '++id, title, description, completed, category, priority, createdDate, dueDate, doneDate, notificationDate, notificationTime, timeSpent',
  priorities: 'name, color, priority',
});

export { db };
