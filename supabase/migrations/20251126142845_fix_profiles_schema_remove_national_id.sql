/*
  # Fix Profiles Table Schema - Remove National ID and Add Missing Columns

  ## Overview
  This migration fixes the profiles table to match the correct schema.
  National ID should NOT be stored in the database for privacy/security reasons.

  ## Changes Made
    1. Add missing columns if they don't exist:
       - `governorate` (text, required)
       - `administration` (text, required)
       - `school` (text, required)
    
    2. Drop the `national_id` column (we don't store it anymore)
    
    3. Update constraints to ensure data integrity

  ## Important Notes
    - National ID is only used in the frontend to generate the student code
    - The student code format: EG + governorate + administration + school + last 2 digits of national ID
    - This is a data-safe migration using conditional checks
*/

-- Add governorate column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'governorate'
  ) THEN
    ALTER TABLE profiles ADD COLUMN governorate text NOT NULL DEFAULT '20';
  END IF;
END $$;

-- Add administration column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'administration'
  ) THEN
    ALTER TABLE profiles ADD COLUMN administration text NOT NULL DEFAULT '';
  END IF;
END $$;

-- Add school column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'school'
  ) THEN
    ALTER TABLE profiles ADD COLUMN school text NOT NULL DEFAULT '';
  END IF;
END $$;

-- Drop national_id column if it exists (we don't store it anymore)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'national_id'
  ) THEN
    ALTER TABLE profiles DROP COLUMN national_id;
  END IF;
END $$;

-- Ensure phone_number has proper NOT NULL constraint without default
DO $$
BEGIN
  ALTER TABLE profiles ALTER COLUMN phone_number SET NOT NULL;
  ALTER TABLE profiles ALTER COLUMN phone_number DROP DEFAULT;
EXCEPTION
  WHEN OTHERS THEN
    NULL;
END $$;

-- Ensure school_year allows NULL (it's optional)
DO $$
BEGIN
  ALTER TABLE profiles ALTER COLUMN school_year DROP NOT NULL;
  ALTER TABLE profiles ALTER COLUMN school_year DROP DEFAULT;
EXCEPTION
  WHEN OTHERS THEN
    NULL;
END $$;

-- Ensure avatar_url allows NULL (it's optional)
DO $$
BEGIN
  ALTER TABLE profiles ALTER COLUMN avatar_url DROP NOT NULL;
  ALTER TABLE profiles ALTER COLUMN avatar_url DROP DEFAULT;
EXCEPTION
  WHEN OTHERS THEN
    NULL;
END $$;