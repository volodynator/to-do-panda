import type { Priority } from './Priority';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: string;
  priority: Priority;
  createdDate: string;
  dueDate: string;
  doneDate: string;
  notificationDate: string;
  notificationTime: string;
  timeSpent: number;
}
