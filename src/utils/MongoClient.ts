import { MongoClient } from 'mongodb';

const connectToMongoDb = async (url: string) => {
  try {
    const client = await MongoClient.connect(url);
    const db = await client.db('nightowl');
    return db;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default connectToMongoDb;
