import clientPromise from '@/app/_utils/MongoClient';
import { NextResponse } from 'next/server';
import { User } from '@/app/_models/User';
export async function POST(req: Request) {
  const { firstName, lastName, username, user_id, createdAt } =
    (await req.json()) as User;

  const client = await clientPromise;
  const usersCollection = client.db('Nightowl').collection('users');

  const user = await usersCollection.insertOne({
    firstName,
    lastName,
    username,
    user_id,
    createdAt,
  });

  return NextResponse.json(user);
}
