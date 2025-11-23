import { manager, type Priority, type Task } from '../../../model';
import { useState } from 'react';
import { revivedClassifier } from '../../../classifier/classifier';
import '../../../css/Button.css';
import '../../../css/Form.css';
import '../../../css/Table.css';

interface TaskCreatorProps {
  priorities: Priority[];
  onUpdated: () => void;
}

export function TaskCreator({ priorities, onUpdated }: TaskCreatorProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [category, setCategory] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<
    Priority | undefined
  >();
  const [dueDate, setDueDate] = useState('');
  const [notificationDate, setNotificationDate] = useState('');
  const [notificationTime, setNotificationTime] = useState('');
  const [status, setStatus] = useState('');

  async function classify(task: string): Promise<string> {
    const result = await revivedClassifier.categorize(task);
    return result;
  }

  async function addTask() {
    try {
      let finalCategory = category;

      if (title.length > 0) {
        if (category === '') {
          console.log('Category empty');
          finalCategory = await classify(title);
        }

        const taskPriority = selectedPriority ?? {
          name: 'Unspecified',
          color: '#000000',
        };

        const newTask = {
          title: title,
          description: description,
          completed: completed,
          category: finalCategory,
          priority: taskPriority,
          createdDate: new Date().toDateString(),
          dueDate: dueDate,
          notificationDate: notificationDate,
          notificationTime: notificationTime,
          timeSpent: 0,
        } as Task;

        const id = await manager.createTask(newTask);
        console.log(await manager.getActiveTasks());

        setStatus(`Task ${title} successfully added. Got id ${id}`);
        setTitle('');
        setDescription('');
        setCompleted(false);
        setCategory('');
        setSelectedPriority(undefined);
        setDueDate('');
        setNotificationDate('');
        setNotificationTime('');
        onUpdated();
      }
    } catch (error) {
      setStatus(`Failed to add ${title}: ${error}`);
    }
  }

  return (
    <div className="form-container form-container--compact">
      {status && <div className="status-message">{status}</div>}

      <div className="form-grid">
        <div className="form-row">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(ev) => setDueDate(ev.target.value)}
          />
        </div>

        <div className="form-row form-row--full">
          <label>Notification</label>
          <input
            type="date"
            value={notificationDate}
            onChange={(ev) => setNotificationDate(ev.target.value)}
          />
          <input
            type="time"
            value={notificationTime}
            onChange={(ev) => setNotificationTime(ev.target.value)}
          />
        </div>

        <div className="form-row form-row--full">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            rows={2}
          />
        </div>

        <div className="form-row form-row--full">
          <label>Priority</label>
          <select
            value={selectedPriority?.name ?? ''}
            onChange={(e) => {
              const name = e.target.value;
              const pr = priorities.find((p) => p.name === name);
              setSelectedPriority(pr);
            }}
          >
            <option value="">Please choose one option</option>
            {priorities.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button onClick={addTask}>Add Task</button>
    </div>
  );
}
