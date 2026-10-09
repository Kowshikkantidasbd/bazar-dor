import { betterAuth } from 'better-auth';
import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { db } from './mongodb';

export const auth = betterAuth({
  // BETTER_AUTH_URL ও BETTER_AUTH_SECRET env থেকে নিজে থেকেই পড়া হয়।
  // Production এ BETTER_AUTH_SECRET না থাকলে better-auth নিজেই error দেবে।
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
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

  // একই ইমেইল দিয়ে Google / GitHub / পাসওয়ার্ড — সব একই অ্যাকাউন্টে যুক্ত হবে
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['google', 'github'],
    },
  },
});
