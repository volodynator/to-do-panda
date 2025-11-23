import { createContext, useContext } from 'react';
import { useDB } from '../hooks/useDB';
import { type Task, type Priority } from '../../model';

type DBContextType = {
  activeTasks: Task[];
  completedTasks: Task[];
  priorities: Priority[];
  loading: boolean;
  reloadTasksAndPriorities: () => Promise<void>;
  clearAllTasks: () => Promise<void>;
  completeTask: (task: Task) => Promise<void>;
  reactivateTask: (task: Task) => Promise<void>;
  updateTask: (id: string, updatedTask: Task) => Promise<void>;
  deleteTask: (task: Task) => Promise<void>;
  createTask: (task: Task) => Promise<void>;
};

type DBProviderProps = {
  children: React.ReactNode;
};

const DBContext = createContext<DBContextType | null>(null);

export function DBProvider({ children }: DBProviderProps) {
  const contextValue = useDB();
  return (
    <DBContext.Provider value={contextValue}>{children}</DBContext.Provider>
  );
}

export function useDBContext(): DBContextType {
  const ctx = useContext(DBContext);
  if (!ctx) {
    throw new Error('No DB context provided');
  }
  return ctx;
}
