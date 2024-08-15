import type { NextApiRequest, NextApiResponse } from 'next';

const users = new Map<string, string>(); // In-memory user store (replace with a real database)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (users.has(email)) {
      res.status(400).json({ message: 'Email already registered' });
    } else {
      users.set(email, password);
      res.status(201).json({ message: 'User registered successfully' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
