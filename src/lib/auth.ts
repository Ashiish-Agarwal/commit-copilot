import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "~/server/db";
import { user, session, account, verification, userTier } from "../../auth-schema";
import { backendUrl } from "./api";


export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema: {
            user,
            session,
            account,
            verification,
        },
    }),
     socialProviders: { 
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID !, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET !, 
      scope:["repo","read:user"]
    }, 
  }, 
   secret: process.env.BETTER_AUTH_SECRET!, // same secret in BOTH .env files ⚠️
  baseURL: process.env.BETTER_AUTH_URL!,   // Next.js URL e.g. http://localhost:3000
  trustedOrigins: [backendUrl!],
  
  
  // allow Elysia origin
  databaseHooks:{
    user:{
      create:{
        after: async (user) => {
           await db.insert(userTier).values({
            id: crypto.randomUUID(),
            userId: user.id,  // <-- prefilled from the created user
            tier: "free",
          });
        }
      }
    }
  }

  
});

