import { betterAuth } from "better-auth";
import pg from "pg";

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
      }
    }
  },

  // ── Assign Role Based On Email Domain ─────
  databaseHooks: {
    user: {
      create: {
        before: (user) => {
          // If the email has the school domain, set them as STUDENT
          const allowedDomain = process.env.ALLOWED_EMAIL_DOMAIN || "@ashesi.edu.gh";
          
          if (user.email && user.email.toLowerCase().endsWith(allowedDomain.toLowerCase())) {
            user.user_type = "STUDENT";
            // The student will need to call /api/users/me/profile-complete to update their details
            user.profile_complete = false;
          } else {
            // Alternatively, other domains can be auto-assigned HOSTEL_MANAGER or default to unverified
            // Defaulting to HOSTEL_MANAGER based on legacy config fallback unless otherwise specified
            user.user_type = "HOSTEL_MANAGER";
            // Set to false initially, requires completion
            user.profile_complete = false;
          }
          return { data: user };
        }
      }
    }
  }
});
