import type { NextApiRequest, NextApiResponse } from 'next';

const users = new Map<string, string>(); // In-memory user store (replace with a real database)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const storedPassword = users.get(email);

    if (storedPassword && storedPassword === password) {
      // Here you should handle generating a token and sending it to the client
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
