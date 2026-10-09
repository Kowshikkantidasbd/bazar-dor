import { MongoClient } from 'mongodb';

const uri = process.env.BETTER_MONGODB_URL;

if (!uri) {
  console.warn('BETTER_MONGODB_URL সেট করা নেই — MongoDB কানেকশন কাজ করবে না।');
}

// Serverless/dev-reload এ বারবার নতুন কানেকশন না খুলতে client টা cache করা হয়
const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient };

export const client =
  globalForMongo._mongoClient ?? new MongoClient(uri ?? 'mongodb://localhost:27017');

globalForMongo._mongoClient = client;

// ডাটাবেস নাম BETTER_MONGODB_URL এর শেষে থাকলে (.../bazar-dor) সেটাই ব্যবহার হবে
export const db = client.db();
