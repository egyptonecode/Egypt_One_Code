/*
  # Add Phone Number to Profiles

  1. Changes
    - Add `phone_number` column to profiles table
    - Phone number is required for contact purposes
    - Add index for faster lookups

  2. Security
    - Column is required (NOT NULL) for new registrations
    - Existing RLS policies automatically apply to this column
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'phone_number'
  ) THEN
    ALTER TABLE profiles ADD COLUMN phone_number text NOT NULL DEFAULT '';
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS profiles_phone_number_idx ON profiles(phone_number);
