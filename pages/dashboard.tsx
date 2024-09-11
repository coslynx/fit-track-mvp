import { useSession } from 'next-auth/react';
import { useStore } from '@/store';
import GoalInput from '@/components/GoalInput';
import ProgressChart from '@/components/ProgressChart';
import SocialShareButton from '@/components/SocialShareButton';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const DashboardPage: React.FC = () => {
  const { data: session } = useSession();
  const store = useStore();
  const [goals, setGoals] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch(`/api/goals/${session?.user?.id}`);
        const data = await response.json();
        setGoals(data);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    const fetchWorkouts = async () => {
      try {
        const response = await fetch(`/api/progress/${session?.user?.id}`);
        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    if (session) {
      fetchGoals();
      fetchWorkouts();
    }
  }, [session]);

  const handleGoalSubmit = async (goal: { name: string; target: string; deadline: Date }) => {
    try {
      const response = await fetch('/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(goal),
      });

      if (response.ok) {
        const data = await response.json();
        setGoals([...goals, data]);
      } else {
        console.error('Error creating goal:', response.status);
      }
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Your Goals</h2>
        {goals.map((goal) => (
          <div key={goal.id} className="border rounded p-4">
            <h3 className="text-lg font-bold">{goal.name}</h3>
            <p>Target: {goal.target}</p>
            <p>Deadline: {goal.deadline.toLocaleDateString()}</p>
            <ProgressChart goalId={goal.id} />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Recent Workouts</h2>
        <ul>
          {workouts.map((workout) => (
            <li key={workout.id} className="border rounded p-4">
              <h3 className="text-lg font-bold">{workout.name}</h3>
              <p>Duration: {workout.duration} minutes</p>
              <p>Calories burned: {workout.calories}</p>
              <p>Date: {workout.date.toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Add a New Goal</h2>
        <GoalInput onSubmit={handleGoalSubmit} />
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Share Your Progress</h2>
        <SocialShareButton title="My Fitness Journey" url="https://your-fitness-tracker-url.com" />
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">View All Goals</h2>
        <Link href="/goals" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          View Goals
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;