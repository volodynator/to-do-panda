import { Undo } from 'lucide-react';
import type { Task } from '../../../../model';
import { useDBContext } from '../../../context/DBContext';
import { DeleteTaskDialog } from '../../dialogs';
import { TaskAllInfoDialog } from '../../dialogs/TaskAllInfoDialog';

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
      <TaskAllInfoDialog task={task}/>
      <DeleteTaskDialog onConfirmation={onConfirmation} />
    </div>
  );
}
