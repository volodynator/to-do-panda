import { Undo } from 'lucide-react';
import type { Task } from '../../../../model';
import { useDBContext } from '../../../context/DBContext';
import { DeleteTaskDialog } from '../../dialogs';

interface CompletedTaskButtonsProps {
  task: Task;
}

export function CompletedTaskButtons({ task }: CompletedTaskButtonsProps) {
  const { reactivateTask, deleteTask } = useDBContext();

  async function onConfirmation() {
    await deleteTask(task);
  }

  return (
    <div className="task-actions-div">
      <button
        className="task-reactivate-btn"
        onClick={() => reactivateTask(task)}
      >
        <Undo />
      </button>
      <DeleteTaskDialog onConfirmation={onConfirmation} />
    </div>
  );
}
