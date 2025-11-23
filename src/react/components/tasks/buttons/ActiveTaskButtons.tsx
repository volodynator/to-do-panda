import { CircleCheckBig } from 'lucide-react';
import type { Task } from '../../../../model';
import { useDBContext } from '../../../context/DBContext';
import { DeleteTaskDialog } from '../../dialogs';

interface ActiveTaskButtonsProps {
  task: Task;
}

export function ActiveTaskButtons({ task }: ActiveTaskButtonsProps) {
  const { completeTask, deleteTask } = useDBContext();

  async function onConfirmation() {
    await deleteTask(task)
  }

  return (
    <div className="task-actions-div">
      <button className="task-complete-btn" onClick={() => completeTask(task)}>
        <CircleCheckBig />
      </button>
      <DeleteTaskDialog onConfirmation={onConfirmation}/>
    </div>
  );
}
