import { useState } from 'react';
import { useStore } from '@/store';
import Button from './Button';

interface GoalInputProps {
  onSubmit: (goal: { name: string; target: string; deadline: Date }) => void;
}

const GoalInput: React.FC<GoalInputProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const store = useStore();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !target || !deadline) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    try {
      onSubmit({ name, target, deadline });
      setName('');
      setTarget('');
      setDeadline(null);
      setErrorMessage('');
    } catch (error) {
      console.error('Error submitting goal:', error);
      setErrorMessage('Failed to submit goal. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="font-medium">
          Goal Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="target" className="font-medium">
          Target:
        </label>
        <input
          type="text"
          id="target"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="deadline" className="font-medium">
          Deadline:
        </label>
        <input
          type="date"
          id="deadline"
          value={deadline ? deadline.toISOString().slice(0, 10) : ''}
          onChange={(e) => setDeadline(new Date(e.target.value))}
          className="border rounded px-3 py-2"
        />
      </div>
      {errorMessage && (
        <p className="text-red-500">{errorMessage}</p>
      )}
      <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Goal
      </Button>
    </form>
  );
};

export default GoalInput;