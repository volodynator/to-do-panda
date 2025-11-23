import { manager, type Priority } from '../../../model';
import '../../../css/Button.css';
import '../../../css/Form.css';
import '../../../css/Table.css';

interface PriorityProps {
  priority: Priority;
  onUpdated: () => void;
}

export default function PriorityCard({ priority, onUpdated }: PriorityProps) {
  return (
    <tr>
      <td>{priority.name}</td>
      <td>
        <div className="priority-color-cell">
          <div
            className="color-indicator"
            style={{ backgroundColor: priority.color }}
          />
        </div>
      </td>
      <td>
        <button
          className="danger"
          onClick={() => {
            manager.deletePriority(priority.name);
            onUpdated();
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
