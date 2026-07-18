-- Add school_id to user table
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS school_id TEXT;

-- Add school_id to HOSTEL table
ALTER TABLE "HOSTEL" ADD COLUMN IF NOT EXISTS school_id TEXT;

-- Create PAYMENT table
CREATE TABLE IF NOT EXISTS "PAYMENT" (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id    UUID REFERENCES "BOOKING"(id) ON DELETE CASCADE,
  student_id    TEXT REFERENCES "user"(id), -- "user" id is likely TEXT based on BetterAuth defaults
  amount        INTEGER NOT NULL,
  currency      TEXT DEFAULT 'GHS',
  reference     TEXT UNIQUE NOT NULL,
  status        TEXT DEFAULT 'PENDING',
  paystack_data JSONB,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);
