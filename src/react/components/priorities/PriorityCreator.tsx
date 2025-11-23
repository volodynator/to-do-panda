import { manager, type Priority } from '../../../model';
import { useState } from 'react';
import '../../../css/Button.css';
import '../../../css/Form.css';
import '../../../css/Table.css';

export function PriorityCreator({
  onPriorityAdded,
}: {
  onPriorityAdded: () => void;
}) {
  const [name, setName] = useState('');
  const [color, setColor] = useState<string>('#000000');

  async function addPriority() {
    try {
      const newPriority = {
        name: name,
        color: color,
      } as Priority;

      manager.createPriority(newPriority);

      setName('');
      setColor('#000000');
      onPriorityAdded();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="form-container">
      <div className="form-row">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
      </div>

      <div className="form-row">
        <label>Color</label>
        <input
          type="color"
          value={color}
          onChange={(ev) => setColor(ev.target.value)}
        />
      </div>

      <button onClick={addPriority}>Add Priority</button>
    </div>
  );
}
