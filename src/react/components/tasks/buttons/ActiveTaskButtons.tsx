import { CircleCheckBig } from 'lucide-react';
import type { Task } from '../../../../model';
import { useDBContext } from '../../../context/DBContext';
import { DeleteTaskDialog } from '../../dialogs';
import { TaskAllInfoDialog } from '../../dialogs/TaskAllInfoDialog';

interface ActiveTaskButtonsProps {
  task: Task;
}

export function ActiveTaskButtons({ task }: ActiveTaskButtonsProps) {
  const { completeTask, deleteTask } = useDBContext();

  async function onConfirmation() {
    await deleteTask(task);
  }

  return (
    <div className="task-actions-div">
      <button className="task-complete-btn" style={{
        background: 'var(--color-success)'
      }} onClick={() => completeTask(task)}>
        <CircleCheckBig />
      </button>
      <TaskAllInfoDialog task={task}/>
      <DeleteTaskDialog onConfirmation={onConfirmation} />
    </div>
  );
}
