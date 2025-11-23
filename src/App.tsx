import { useEffect } from 'react';
import { TaskList } from './react';
import { TaskCreator } from './react';
import { PriorityList } from './react/components/priorities';
import { PriorityCreator } from './react/components/priorities';
import { TimerManager } from './react/components/timer';
import {
  ActiveTaskButtons,
  CompletedTaskButtons,
} from './react/components/tasks/buttons';
import './css/App.css';
import './css/Button.css';
import './css/Form.css';
import './css/Table.css';
import { useDBContext } from './react/context/DBContext';

export function App() {
  const {
    activeTasks,
    completedTasks,
    priorities,
    reloadTasksAndPriorities,
    clearAllTasks,
  } = useDBContext();

  useEffect(() => {
    reloadTasksAndPriorities();
  }, []);

  return (
    <div>
      <div className="timer">
        <TimerManager/>
      </div>
      <div className="app-container">
        <div className="main-content">
          <div className="section">
            <h1>Active Tasks</h1>
            <TaskList
              tasks={activeTasks}
              renderActions={(task) => <ActiveTaskButtons task={task} />}
            />
          </div>

          <div className="section">
            <h1>Completed Tasks</h1>
            <TaskList
              tasks={completedTasks}
              renderActions={(task) => <CompletedTaskButtons task={task} />}
            />
          </div>

          <div className="section">
            <h1>Add new task</h1>
            <TaskCreator
              priorities={priorities}
              onUpdated={reloadTasksAndPriorities}
            />
          </div>

          <button className="secondary clear-button" onClick={clearAllTasks}>
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
