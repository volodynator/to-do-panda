import type { Priority } from '../../../model';
import PriorityCard from './Priority';
import '../../../css/Button.css';
import '../../../css/Form.css';
import '../../../css/Table.css';

interface PriorityListProps {
  priorities: Priority[];
  onUpdated: () => void;
}

export function PriorityList({ priorities, onUpdated }: PriorityListProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Priority</th>
          <th>Color</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {priorities.map((priority) => (
          <PriorityCard
            key={priority.name}
            priority={priority}
            onUpdated={onUpdated}
          />
        ))}
      </tbody>
    </table>
  );
}
