import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@/config/next-auth.config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    res.status(200).json({ user: session.user });
  } else {
    res.status(401).json({ message: 'Authentication required' });
  }
}