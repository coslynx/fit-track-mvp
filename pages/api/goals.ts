import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const userId = parseInt(req.body.userId, 10);
    const { name, target, deadline } = req.body;

    try {
      const goal = await prisma.goal.create({
        data: {
          name,
          target,
          deadline: new Date(deadline),
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      res.status(201).json(goal);
    } catch (error) {
      console.error('Error creating goal:', error);
      res.status(500).json({ message: 'Error creating goal' });
    }
  } else if (req.method === 'GET') {
    const userId = parseInt(req.query.userId as string, 10);

    try {
      const goals = await prisma.goal.findMany({
        where: {
          userId,
        },
      });

      res.status(200).json(goals);
    } catch (error) {
      console.error('Error fetching goals:', error);
      res.status(500).json({ message: 'Error fetching goals' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}