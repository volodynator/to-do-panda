import { manager, type Priority, type Task } from './model';
import { useEffect, useState } from 'react';
import { TaskList } from './reactContainer';
import { TaskCreator } from './reactContainer';
import { PriorityList } from './reactContainer/mainPage/priorities';
import { PriorityCreator } from './reactContainer/mainPage/priorities';
import { TimerManager } from './reactContainer/mainPage/timer';
import { CircleCheckBig, Undo } from 'lucide-react';
import './css/App.css';
import './css/Button.css';
import './css/Form.css';
import './css/Table.css';

export function App() {
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);

  async function reloadTasksAndPriorities() {
    const activeTasks = await manager.showActiveTasks();
    const completedTasks = await manager.showInactiveTasks();
    const priorities = await manager.showPriorities();
    setActiveTasks(activeTasks);
    setCompletedTasks(completedTasks);
    setPriorities(priorities);
  }

  async function clearTasksAndReload() {
    await manager.clearAllTasks();
    await reloadTasksAndPriorities();
  }

  async function completeTaskAndReload(task: Task): Promise<void> {
    await manager.completeTask(task.id);
    await reloadTasksAndPriorities();
  }

  async function reactivateTaskAndReload(task: Task): Promise<void> {
    await manager.reactivateTask(task.id);
    await reloadTasksAndPriorities();
  }

  useEffect(() => {
    reloadTasksAndPriorities();
  }, []);

  return (
    <div>
      <div className="timer">
        <TimerManager
          tasks={activeTasks}
          onTimerEnded={reloadTasksAndPriorities}
        />
      </div>
      <div className="app-container">
        <div className="main-content">
          <div className="section">
            <h1>Active Tasks</h1>
            <TaskList
              tasks={activeTasks}
              renderActions={(task) => (
                <button onClick={() => completeTaskAndReload(task)}>
                  <CircleCheckBig/>
                </button>
              )}
            />
          </div>

          <div className="section">
            <h1>Completed Tasks</h1>
            <TaskList
              tasks={completedTasks}
              renderActions={(task) => (
                <button onClick={() => reactivateTaskAndReload(task)}>
                  <Undo/>
                </button>
              )}
            />
          </div>

          <div className="section">
            <h1>Add new task</h1>
            <TaskCreator
              priorities={priorities}
              onUpdated={reloadTasksAndPriorities}
            />
          </div>

          <button
            className="secondary clear-button"
            onClick={clearTasksAndReload}
          >
            Clear Tasks
          </button>
        </div>
        <div className="sidebar">
          <div className="section">
            <h1>Priorities</h1>
            <PriorityList
              priorities={priorities}
              onUpdated={reloadTasksAndPriorities}
            />
          </div>

          <div className="section">
            <h2>Add new priority</h2>
            <PriorityCreator onPriorityAdded={reloadTasksAndPriorities} />
          </div>
        </div>
      </div>
    </div>
  );
}
