import { betterAuth } from 'better-auth';
import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { db } from './mongodb';

const baseURL = process.env.BETTER_AUTH_URL || 'http://localhost:3000';

// যে যে ঠিকানা থেকে অনুরোধ আসতে পারবে
const trustedOrigins = [
  baseURL,
  'http://localhost:3000',
  'https://bazar-dor-cgzi.vercel.app',
  process.env.BETTER_AUTH_URL_1,
].filter((origin): origin is string => Boolean(origin));

export const auth = betterAuth({
  baseURL,
  trustedOrigins: Array.from(new Set(trustedOrigins)),
  secret: process.env.BETTER_AUTH_SECRET,

  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      enabled: Boolean(process.env.GOOGLE_CLIENT_ID),
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      enabled: Boolean(process.env.GITHUB_CLIENT_ID),
    },
  },

  
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['google', 'github'],
    },
  },
});