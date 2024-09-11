import { unstable_getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/config/next-auth.config";
import { validateGoal, validateWorkout } from "@/utils/validation";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    const userId = parseInt(req.body.userId, 10);

    if (req.body.name && req.body.target && req.body.deadline) {
      try {
        const goal = await prisma.goal.create({
          data: {
            name: req.body.name,
            target: req.body.target,
            deadline: new Date(req.body.deadline),
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });

        res.status(201).json(goal);
      } catch (error) {
        console.error("Error creating goal:", error);
        res.status(500).json({ message: "Error creating goal" });
      }
    } else if (req.body.name && req.body.duration && req.body.calories && req.body.date) {
      try {
        const workout = await prisma.workout.create({
          data: {
            name: req.body.name,
            duration: req.body.duration,
            calories: req.body.calories,
            date: new Date(req.body.date),
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });

        res.status(201).json(workout);
      } catch (error) {
        console.error("Error creating workout:", error);
        res.status(500).json({ message: "Error creating workout" });
      }
    } else {
      res.status(400).json({ message: "Invalid request body" });
    }
  } else if (req.method === "GET") {
    const userId = parseInt(req.query.userId as string, 10);

    if (req.query.type === "goals") {
      try {
        const goals = await prisma.goal.findMany({
          where: {
            userId,
          },
        });

        res.status(200).json(goals);
      } catch (error) {
        console.error("Error fetching goals:", error);
        res.status(500).json({ message: "Error fetching goals" });
      }
    } else if (req.query.type === "workouts") {
      try {
        const workouts = await prisma.workout.findMany({
          where: {
            userId,
          },
          orderBy: {
            date: "desc",
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
        console.error("Error fetching workouts:", error);
        res.status(500).json({ message: "Error fetching workouts" });
      }
    } else {
      res.status(400).json({ message: "Invalid request query" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}