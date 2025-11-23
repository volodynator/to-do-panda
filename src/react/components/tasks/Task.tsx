import { type Task } from '../../../model';
import '../../../css/Button.css';
import '../../../css/Form.css';
import '../../../css/Table.css';

interface TaskCardProps {
  task: Task;
  renderActions: (task: Task) => React.ReactNode;
}

export default function TaskCard({ task, renderActions }: TaskCardProps) {
  return (
    <tr>
      <td>{task.title}</td>
      <td>
        <div className="priority-badge-container">
          <div
            className="color-indicator"
            style={{ backgroundColor: task.priority.color }}
          />
          <span>{task.priority.name}</span>
        </div>
      </td>
      <td>{task.category}</td>
      <td>{task.timeSpent ? Math.floor(task.timeSpent / 60) : 0}</td>
      <td>{task.timeSpent ? task.timeSpent % 60 : 0}</td>
      <td>{renderActions(task)}</td>
    </tr>
  );
}
