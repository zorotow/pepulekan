/*
  # Database Schema Setup

  1. Tables
    - users (auth)
    - profiles (user profiles)
    - courses (educational courses)
    - course_contents (course materials)
    - enrollments (user course enrollments)
    - progress (user learning progress)
    
  2. Security
    - Enable RLS on all tables
    - Add policies for data access control
    
  3. Indexes
    - Optimize common query patterns
    - Support efficient filtering and sorting
*/

-- Create users table first (required for auth)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Create profiles table with reference to users
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  username text UNIQUE,
  full_name text,
  avatar_url text,
  language text DEFAULT 'en',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  thumbnail text,
  grade text,
  subject text,
  language text DEFAULT 'en',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create course contents table
CREATE TABLE IF NOT EXISTS course_contents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  type text NOT NULL,
  content text NOT NULL,
  sequence_order integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  UNIQUE(user_id, course_id)
);

-- Create progress table
CREATE TABLE IF NOT EXISTS progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  content_id uuid REFERENCES course_contents(id) ON DELETE CASCADE,
  status text DEFAULT 'not_started',
  completed_at timestamptz,
  last_position integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, content_id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_courses_featured ON courses(featured);
CREATE INDEX IF NOT EXISTS idx_courses_grade ON courses(grade);
CREATE INDEX IF NOT EXISTS idx_courses_subject ON courses(subject);
CREATE INDEX IF NOT EXISTS idx_courses_language ON courses(language);
CREATE INDEX IF NOT EXISTS idx_course_contents_course_id ON course_contents(course_id);
CREATE INDEX IF NOT EXISTS idx_course_contents_sequence_order ON course_contents(sequence_order);
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_progress_user_id ON progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_content_id ON progress(content_id);

-- Set up RLS policies with existence checks
DO $$ 
BEGIN
  -- Profiles policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can view their own profile'
  ) THEN
    CREATE POLICY "Users can view their own profile"
      ON profiles
      FOR SELECT
      TO authenticated
      USING (auth.uid() = id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update their own profile'
  ) THEN
    CREATE POLICY "Users can update their own profile"
      ON profiles
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = id);
  END IF;

  -- Courses policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'courses' AND policyname = 'Anyone can view courses'
  ) THEN
    CREATE POLICY "Anyone can view courses"
      ON courses
      FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;

  -- Course contents policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'course_contents' AND policyname = 'Anyone can view course contents'
  ) THEN
    CREATE POLICY "Anyone can view course contents"
      ON course_contents
      FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;

  -- Enrollments policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'enrollments' AND policyname = 'Users can view their enrollments'
  ) THEN
    CREATE POLICY "Users can view their enrollments"
      ON enrollments
      FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'enrollments' AND policyname = 'Users can enroll in courses'
  ) THEN
    CREATE POLICY "Users can enroll in courses"
      ON enrollments
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'enrollments' AND policyname = 'Users can update their enrollment status'
  ) THEN
    CREATE POLICY "Users can update their enrollment status"
      ON enrollments
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  -- Progress policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'progress' AND policyname = 'Users can view their progress'
  ) THEN
    CREATE POLICY "Users can view their progress"
      ON progress
      FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'progress' AND policyname = 'Users can insert progress records'
  ) THEN
    CREATE POLICY "Users can insert progress records"
      ON progress
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'progress' AND policyname = 'Users can update their progress'
  ) THEN
    CREATE POLICY "Users can update their progress"
      ON progress
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END $$;