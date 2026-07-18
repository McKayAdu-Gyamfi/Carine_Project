import { betterAuth } from "better-auth";
import pg from "pg";
import { getSchoolById } from "./src/config/schools.js";

export const auth = betterAuth({

  // ── Tell BetterAuth to use your Supabase DB ──────────────
  database: new pg.Pool({
    connectionString: process.env.DATABASE_URL
  }),

  // ── Email/Password Authentication ─────────────
  emailAndPassword: {
    enabled: true,
    autoSignIn: false
  },

  // ── Social Authentication ─────────────
  socialProviders: {
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      tenantId: process.env.MICROSOFT_TENANT_ID || "common"
    }
  },

  // ── Expose Custom Fields in Response ────────
  user: {
    additionalFields: {
      user_type: {
        type: "string",
      },
      profile_complete: {
        type: "boolean",
      },
      payment_details: {
        type: "string",
      },
      school_id: {
        type: "string",
      }
    }
  },

  // ── Assign Role Based On Email Domain ─────
  databaseHooks: {
    user: {
      create: {
        before: (user) => {
          // Identify school by school_id if passed, otherwise default checks
          let userDomain = "";
          if (user.email) {
            userDomain = "@" + user.email.split("@")[1];
          }

          // If school_id is provided, validate domain
          if (user.school_id) {
            const school = getSchoolById(user.school_id);
            if (!school) {
              throw new Error("Invalid school selection");
            }
            if (userDomain.toLowerCase() !== school.domain.toLowerCase()) {
              throw new Error(`Email domain must be ${school.domain} for ${school.name}`);
            }
            user.user_type = "STUDENT";
            user.profile_complete = false;
          } else {
            // Default legacy behavior
            const allowedDomain = process.env.ALLOWED_EMAIL_DOMAIN || "@ashesi.edu.gh";
            if (userDomain.toLowerCase() === allowedDomain.toLowerCase()) {
              user.user_type = "STUDENT";
              user.profile_complete = false;
            } else {
              user.user_type = "HOSTEL_MANAGER";
              user.profile_complete = false;
            }
          }
          return { data: user };
        }
      }
    }
  }
});
