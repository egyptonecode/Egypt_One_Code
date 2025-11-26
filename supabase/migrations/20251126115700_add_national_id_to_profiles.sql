/*
  # Add National ID to Profiles

  1. Changes
    - Add `national_id` column to profiles table
    - National ID is a unique 14-digit Egyptian national identification number
    - Add unique constraint to prevent duplicate national IDs
    - Add index for faster lookups

  2. Security
    - Column is required (NOT NULL) for new registrations
    - Existing RLS policies automatically apply to this column
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'national_id'
  ) THEN
    ALTER TABLE profiles ADD COLUMN national_id text UNIQUE NOT NULL;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS profiles_national_id_idx ON profiles(national_id);
