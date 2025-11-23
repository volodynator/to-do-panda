import type { Task } from '../../../model';
import TaskCard from './Task';
import '../../../css/Button.css';
import '../../../css/Form.css';
import '../../../css/Table.css';

interface TaskListProps {
  tasks: Task[];
  renderActions: (task: Task) => React.ReactNode;
}

export function TaskList({ tasks, renderActions }: TaskListProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Priority</th>
          <th>Category</th>
          <th>Hours Spent</th>
          <th>Minutes Spent</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} renderActions={renderActions} />
        ))}
      </tbody>
    </table>
  );
}
