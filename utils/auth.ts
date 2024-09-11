import { unstable_getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/config/next-auth.config";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isValidPassword = await user.comparePassword(password);

      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const session = await unstable_getServerSession(req, res, authOptions);

      if (!session) {
        return res.status(401).json({ message: "Authentication failed" });
      }

      res.status(200).json({ message: "Login successful", user: session.user });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Error logging in" });
    }
  } else if (req.method === "GET") {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (session) {
      res.status(200).json({ user: session.user });
    } else {
      res.status(401).json({ message: "Authentication required" });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.session.deleteMany({
        where: { userId: session?.user.id },
      });

      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Error logging out:", error);
      res.status(500).json({ message: "Error logging out" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}