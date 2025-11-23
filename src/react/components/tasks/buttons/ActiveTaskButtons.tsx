import { CircleCheckBig, Trash } from 'lucide-react';
import type { Task } from '../../../../model';
import { useDBContext } from '../../../context/DBContext';

interface ActiveTaskButtonsProps {
  task: Task;
}

export function ActiveTaskButtons({ task }: ActiveTaskButtonsProps) {
  const { completeTask, reactivateTask } = useDBContext();

  return (
    <div className="task-actions-div">
      <button className="task-complete-btn" onClick={() => completeTask(task)}>
        <CircleCheckBig />
      </button>
      <button className="task-delete-btn" onClick={() => reactivateTask(task)}>
        <Trash />
      </button>
    </div>
  );
}
