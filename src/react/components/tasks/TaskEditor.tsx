import { type Priority, type Task } from '../../../model';
import { useState } from 'react';
import { revivedClassifier } from '../../../classifier/classifier';
import '../../../css/Button.css';
import '../../../css/Form.css';
import '../../../css/Table.css';
import { useDBContext } from '../../context/DBContext';

interface TaskEditorProps {
  task: Task
}


export function TaskEditor({task}: TaskEditorProps) {
  const [title, setTitle] = useState(task.title ? task.title : 'Empty task');
  const [description, setDescription] = useState(task.description ? task.description : '');
  const [completed] = useState(task.completed);
  const [category, setCategory] = useState(task.category);
  const [selectedPriority, setSelectedPriority] = useState<
    Priority | undefined
  >(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [notificationDate, setNotificationDate] = useState(task.notificationDate);
  const [notificationTime, setNotificationTime] = useState(task.notificationTime);
  const [status, setStatus] = useState('');
  const { priorities, updateTask, reloadTasksAndPriorities } = useDBContext();

  async function classify(task: string): Promise<string> {
    const result = await revivedClassifier.categorize(task);
    return result;
  }

  async function buildUpdatedTask() {
    try {
      let finalCategory = category;

      if (title.length > 0) {
        if (category === '') {
          finalCategory = await classify(title);
        }

        const taskPriority = selectedPriority ?? {
          name: 'Unspecified',
          color: '#000000',
        };

        const updatedTask = {
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

        await updateTask(task.id, updatedTask);

        setStatus(`Task ${title} successfully updated.`);
        await reloadTasksAndPriorities();
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

      <button onClick={buildUpdatedTask}>Save</button>
    </div>
  );
}
