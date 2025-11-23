import { Undo, Trash } from 'lucide-react';
import type { Task } from '../../../../model';
import { useDBContext } from '../../../context/DBContext';

interface CompletedTaskButtonsProps {
  task: Task;
}

export function CompletedTaskButtons({ task }: CompletedTaskButtonsProps) {
  const { reactivateTask } = useDBContext();

  return (
    <div className="task-actions-div">
      <button
        className="task-reactivate-btn"
        onClick={() => reactivateTask(task)}
      >
        <Undo />
      </button>
      <button className="task-delete-btn" onClick={() => reactivateTask(task)}>
        <Trash />
      </button>
    </div>
  );
}
