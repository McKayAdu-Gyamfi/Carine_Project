// import { betterAuth } from "better-auth";
// import { supabase }  from "../config/db.js";
// import "dotenv/config";

// export const dialect = supabase;

// export const auth = betterAuth({
//   database: dialect,
//   baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
//   emailAndPassword: { enabled: true },
//   user: {
//     additionalFields: {
//       user_type: {
//         type: "string",
//         required: false, // Set to false to allow BetterAuth to create rows without it originally
//       },
//       student_id: {
//         type: "string",
//         required: false,
//       },
//       course: {
//         type: "string",
//         required: false,
//       },
//       profile_complete: {
//         type: "boolean",
//         required: false,
//       },
//       current_room_id: {
//         type: "string",
//         required: false,
//       }
//     }
//   },
//   socialProviders: {
//     microsoft: {
//       clientId: process.env.MICROSOFT_CLIENT_ID || "",
//       clientSecret: process.env.MICROSOFT_CLIENT_SECRET || "",
//       tenantId: process.env.MICROSOFT_TENANT_ID || "common",
//     }
//   },
//   databaseHooks: {
//     user: {
//       create: {
//         before: (user) => {
//           // If the email has the school domain (e.g., '@school.edu'), set them as STUDENT
//           // Real check might be based on provider or email domain.
//           if (user.email && user.email.endsWith("@ashesi.edu.gh")) {
//             user.user_type = "STUDENT";
//             // Note: EmployeeId / Department parsing logic would go here if available 
//             // in the raw profile payload of the user param. Because we only have standard
//             // user structure here, we set user_type. The other fields (student_id, course)
//             // can be updated during profile completion.
//             user.profile_complete = false; 
//           }
//           return { data: user };
//         }
//       }
//     }
//   }
// });
// src/config/betterauth.config.js
import { betterAuth } from "better-auth";
import { supabase }   from "../config/db.js";
import pg from "pg";

export const auth = betterAuth({

  // ── Tell BetterAuth to use your Supabase DB ──────────────
  database: new pg.Pool({
    connectionString: process.env.DATABASE_URL
  }),

  // ── Email/Password — for managers and admins ─────────────
  emailAndPassword: {
    enabled: true,
  },

  // ── Microsoft OAuth — for students ───────────────────────
  socialProviders: {
    microsoft: {
      clientId:     process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      tenantId:     process.env.MICROSOFT_TENANT_ID,
    },
  },

  // ── Extract student data after first Microsoft login ─────
  callbacks: {
    async onSignUp({ user, account, profile }) {
      if (account.providerId === "microsoft") {

        // Validate school email domain
        if (!user.email.endsWith(process.env.ALLOWED_EMAIL_DOMAIN)) {
          throw new Error("Please use your school Microsoft account");
        }

        // Extract student fields from Azure AD profile
        const student_id = profile.employeeId || null;
        const course     = profile.department  || null;

        // Update the user row with your custom fields
        // using your Supabase JS client
        await supabase
          .from("user")
          .update({
            user_type:"STUDENT",
            student_id,
            course,
            profile_complete: !!(student_id && course),
          })
          .eq("id", user.id);
      }
    },
  },
});
