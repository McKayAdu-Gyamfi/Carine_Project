import { betterAuth } from "better-auth";
import { Pool } from "pg";
import "dotenv/config";

export const dialect = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const auth = betterAuth({
  database: dialect,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: { enabled: true },
  user: {
    additionalFields: {
      user_type: {
        type: "string",
        required: false, // Set to false to allow BetterAuth to create rows without it originally
      },
      student_id: {
        type: "string",
        required: false,
      },
      course: {
        type: "string",
        required: false,
      },
      profile_complete: {
        type: "boolean",
        required: false,
      },
      current_room_id: {
        type: "string",
        required: false,
      }
    }
  },
  socialProviders: {
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID || "",
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET || "",
      tenantId: process.env.MICROSOFT_TENANT_ID || "common",
    }
  },
  databaseHooks: {
    user: {
      create: {
        before: (user) => {
          // If the email has the school domain (e.g., '@school.edu'), set them as STUDENT
          // Real check might be based on provider or email domain.
          if (user.email && user.email.endsWith("@ashesi.edu.gh")) {
            user.user_type = "STUDENT";
            // Note: EmployeeId / Department parsing logic would go here if available 
            // in the raw profile payload of the user param. Because we only have standard
            // user structure here, we set user_type. The other fields (student_id, course)
            // can be updated during profile completion.
            user.profile_complete = false; 
          }
          return { data: user };
        }
      }
    }
  }
});
