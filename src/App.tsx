import { useEffect } from 'react';
import { TaskList } from './react';
import { PriorityList } from './react/components/priorities';
import { PriorityCreator } from './react/components/priorities';
import { TimerManager } from './react/components/timer';
import { ActiveTaskButtons } from './react/components/tasks/buttons';
import './css/App.css';
import './css/Button.css';
import './css/Form.css';
import './css/Table.css';
import { useDBContext } from './react/context/DBContext';
import { CompletedTasksDisclosure } from './react/components/tasks/CompletedTasksDisclosure';
import { TaskCreatorDialog } from './react/components/dialogs';

export function App() {
  const {
    activeTasks,
    completedTasks,
    priorities,
    reloadTasksAndPriorities,
  } = useDBContext();

  useEffect(() => {
    reloadTasksAndPriorities();
  }, []);

  return (
    <>
    <div>
      <div className="timer">
        <TimerManager />
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
            <CompletedTasksDisclosure tasks={completedTasks} />
          </div>

          <TaskCreatorDialog/>

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
     <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">
            © 2025 TO-DO Panda. Built with React & TypeScript.
          </p>
          <div className="footer-links">
            <a href="mailto:volodymyr.simakov@zohomail.eu" className="footer-link">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}
