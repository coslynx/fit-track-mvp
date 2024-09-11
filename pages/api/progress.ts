import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const userId = parseInt(req.query.userId as string, 10);

    try {
      const workouts = await prisma.workout.findMany({
        where: {
          userId,
        },
        orderBy: {
          date: 'desc',
        },
      });

      const formattedWorkouts = workouts.map((workout) => ({
        id: workout.id,
        name: workout.name,
        duration: workout.duration,
        calories: workout.calories,
        date: workout.date.toLocaleDateString(),
      }));

      res.status(200).json(formattedWorkouts);
    } catch (error) {
      console.error('Error fetching workouts:', error);
      res.status(500).json({ message: 'Error fetching workouts' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}