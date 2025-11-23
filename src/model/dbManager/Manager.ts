import type { Priority, Task } from '../types';
import type { DBManager } from './Interface';
import { db } from '../database';
import { TaskNotFoundError } from '../../error/TaskNotFoundError';

class DBManagerImpl implements DBManager {
  async createTask(task: Task): Promise<string> {
    const id = await db.tasks.add(task);
    return id;
  }

  async readTask(id: string): Promise<Task> {
    const task = await db.tasks.get({ id: id });
    if (task) {
      return task;
    } else {
      throw new TaskNotFoundError(id);
    }
  }

  async updateTask(id: string, updatedTask: Task): Promise<void> {
    const existing = await db.tasks.get(id);
    if (!existing) {
      throw new TaskNotFoundError(id);
    }
    await db.tasks.update(id, { ...existing, ...updatedTask });
  }

  async deleteTask(id: string): Promise<void> {
    await db.tasks.delete(id);
  }

  async completeTask(id: string): Promise<void> {
    await db.tasks.update(id, {
      completed: true,
      doneDate: new Date().toDateString(),
    });
  }

  async reactivateTask(id: string): Promise<void> {
    await db.tasks.update(id, { completed: false, doneDate: '' });
  }

  async getActiveTasks(): Promise<Task[]> {
    return await db.tasks.filter((task) => task.completed === false).toArray();
  }

  async getInactiveTasks(): Promise<Task[]> {
    return await db.tasks.filter((task) => task.completed === true).toArray();
  }

  async clearAllTasks(): Promise<void> {
    await db.tasks.clear();
  }

  async createPriority(priority: Priority): Promise<string> {
    const id = await db.priorities.add(priority);
    return id;
  }

  async readPriority(name: string): Promise<Priority> {
    const priority = await db.priorities.get({ name: name });
    if (priority) {
      return priority;
    } else {
      throw new Error();
    }
  }

  async updatePriority(name: string, updatedPriority: Priority): Promise<void> {
    const existing = await db.priorities.get(name);
    if (!existing) {
      throw new Error();
    }
    await db.priorities.update(name, { ...existing, ...updatedPriority });
  }

  async deletePriority(name: string): Promise<void> {
    await db.priorities.delete(name);
  }

  async getPriorities(): Promise<Priority[]> {
    return db.priorities.toArray();
  }
}

export const manager: DBManagerImpl = new DBManagerImpl();
