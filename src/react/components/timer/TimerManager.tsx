import { useState } from 'react';

import { manager, type Task } from '../../../model';
import { Timer } from './Timer';
import { CirclePlay, CircleStop, RotateCcw } from 'lucide-react';

interface TimerManagerProps {
  tasks: Task[];
  onTimerEnded: () => void;
}

export function TimerManager({ tasks, onTimerEnded }: TimerManagerProps) {
  const [timeToCountdownInMins, setTimeToCountdownInMins] = useState(5);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const handleStart = () => {
    setTimeToCountdownInMins(hours * 60 + minutes);
    if (timeToCountdownInMins > 0) {
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(true);
    setTimerKey((prev) => prev + 1);
  };

  const handleTimerEnd = async () => {
    setIsRunning(false);
    if (selectedTask) {
      console.log(`Time spent ${timeToCountdownInMins}`);
      console.log(`Old value ${selectedTask.timeSpent}`);
      const newTimeSpent = selectedTask.timeSpent + timeToCountdownInMins;
      selectedTask.timeSpent = newTimeSpent;
      await manager.updateTask(selectedTask?.id, selectedTask);
      console.log(`New value ${selectedTask.timeSpent}`);
    }
    onTimerEnded();
  };

  function runningTimer() {
    return (
      <div className="running-timer">
        <Timer
          key={timerKey}
          timeToCountdown={timeToCountdownInMins}
          onComplete={handleTimerEnd}
        />
        <div className="timer-controls">
          <button onClick={handleStop}>
            <CircleStop height={'20px'} />
          </button>
          <button onClick={handleReset}>
            <RotateCcw height={'20px'} />
          </button>
        </div>
      </div>
    );
  }

  function stoppedTimer() {
    return (
      <div className="stopped-timer">
        <div className="stopped-timer-task">
          <div className="time-stepper">
            <input
              id="hours"
              type="number"
              min="0"
              max="23"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              disabled={isRunning}
            />
            <div>H</div>

            <input
              id="minutes"
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              disabled={isRunning}
            />
            <div>M</div>
          </div>

          <select
            value={selectedTask?.title ?? ''}
            onChange={(e) => {
              const title = e.target.value;
              const task = tasks.find((t) => t.title === title);
              setSelectedTask(task);
            }}
            disabled={isRunning}
          >
            <option value="">select task</option>
            {tasks.map((t) => (
              <option key={t.id} value={t.title}>
                {t.title}
              </option>
            ))}
          </select>
        </div>

        <div className="timer-controls">
          <button onClick={handleStart}>
            <CirclePlay height={'20px'} />
          </button>
        </div>
      </div>
    );
  }

  return isRunning ? runningTimer() : stoppedTimer();
}
