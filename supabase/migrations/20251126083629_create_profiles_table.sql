/*
  # Egypt One Code - Student Profiles Table

  ## Overview
  Creates a profiles table for Egyptian students in Matrouh Governorate, linking to Supabase auth.users.
  This implements the "One Code" concept where each student has a unique national identifier.

  ## Tables Created
  ### profiles
    - `id` (uuid, primary key) - References auth.users(id), auto-cascades on delete
    - `full_name` (text, required) - Student's full name in Arabic
    - `student_code` (text, unique, required) - National student ID code (الكود الوطني)
    - `school_year` (text) - Current school year/grade
    - `avatar_url` (text) - Profile picture URL
    - `created_at` (timestamptz) - Account creation timestamp
    - `updated_at` (timestamptz) - Last profile update timestamp

  ## Security
  - RLS enabled on profiles table
  - Authenticated users can read their own profile
  - Authenticated users can update their own profile
  - Users can insert their profile during signup
  - Users can delete their own profile

  ## Important Notes
  1. student_code must be unique across all profiles
  2. Profiles are automatically deleted when auth.users record is deleted (CASCADE)
  3. All students must provide full_name and student_code during registration
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  student_code text UNIQUE NOT NULL,
  school_year text DEFAULT '',
  avatar_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete own profile"
  ON profiles FOR DELETE
  TO authenticated
  USING (auth.uid() = id);

CREATE INDEX IF NOT EXISTS profiles_student_code_idx ON profiles(student_code);