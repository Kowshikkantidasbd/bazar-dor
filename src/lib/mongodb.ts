import { MongoClient } from 'mongodb';

const uri = process.env.BETTER_MONGODB_URL;

if (!uri) {
  console.warn('BETTER_MONGODB_URL সেট করা নেই — MongoDB কানেকশন কাজ করবে না।');
}


const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient };

export const client =
  globalForMongo._mongoClient ?? new MongoClient(uri ?? 'mongodb://localhost:27017');

globalForMongo._mongoClient = client;


export const db = client.db();
