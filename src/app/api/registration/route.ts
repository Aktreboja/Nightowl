// src/app/api/registration/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import connectToMongoDb from '@/utils/MongoClient';

// Registration API route
const registerUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { user } = req.body;
    const db = await connectToMongoDb(process.env.MONGODB_URL as string);
    const accountsCollection = db.collection('accounts');
    const existingUser = await accountsCollection.findOne({
      email: user.email,
    });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default registerUser;
