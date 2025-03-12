// pages/api/hello.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: 'Hello, world!' });
};

export default handler;
