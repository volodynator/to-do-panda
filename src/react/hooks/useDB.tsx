import { useState, useEffect } from 'react';
import { manager, type Task, type Priority } from '../../model';

export const useDB = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getActiveTasks = async () => {
      try {
        const activeTasks = await manager.getActiveTasks();
        setTasks(activeTasks);
      } catch (err) {
        console.log(err);
      }
    };
    const getInactiveTasks = async () => {
      try {
        const completedTasks = await manager.getInactiveTasks();
        setCompletedTasks(completedTasks);
      } catch (err) {
        console.log(err);
      }
    };
    const getPriorities = async () => {
      try {
        const priorities = await manager.getPriorities();
        setPriorities(priorities);
      } catch (err) {
        console.log(err);
      }
    };

    setLoading(true);
    getActiveTasks();
    getInactiveTasks();
    getPriorities();
    setLoading(false);
  }, []);

  async function reloadTasksAndPriorities() {
    try {
      const activeTasks = await manager.getActiveTasks();
      const completedTasks = await manager.getInactiveTasks();
      const priorities = await manager.getPriorities();

      setTasks(activeTasks);
      setCompletedTasks(completedTasks);
      setPriorities(priorities);
    } catch (err) {
      console.log(err);
    }
  }

  async function clearAllTasks() {
    try {
      await manager.clearAllTasks();
      await reloadTasksAndPriorities();
    } catch (err) {
      console.log(err);
    }
  }

  async function completeTask(task: Task): Promise<void> {
    try {
      await manager.completeTask(task.id);
      await reloadTasksAndPriorities();
    } catch (err) {
      console.log(err);
    }
  }

  async function reactivateTask(task: Task): Promise<void> {
    try {
      await manager.reactivateTask(task.id);
      await reloadTasksAndPriorities();
    } catch (err) {
      console.log(err);
    }
  }

  return {
    activeTasks: tasks,
    completedTasks: completedTasks,
    priorities: priorities,
    loading,
    reloadTasksAndPriorities,
    clearAllTasks,
    completeTask,
    reactivateTask,
  };
};
