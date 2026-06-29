import { betterAuth } from "better-auth";
import {prismaAdapter} from "better-auth/adapters/prisma"
import { prisma } from "../prisma";
export const auth = betterAuth({
  database:
    prismaAdapter(prisma,
    {
      provider: "postgresql",
    }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },
  trustedOrigins : ["http://localhost:3000", "https://penny-pal-silk.vercel.app"],
  secret : process.env.BETTER_AUTH_SECRET,
  baseURL : process.env.BETTER_AUTH_URL
});
