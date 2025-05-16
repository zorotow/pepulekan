/*
  # Initial Schema for Pepulekan Educational Platform

  1. New Tables
    - `profiles` - User profile data
    - `courses` - Educational course information
    - `course_contents` - Content items for courses
    - `enrollments` - Record of user enrollments in courses
    - `progress` - User progress through course content
  
  2. Security
    - Enable RLS on all tables
    - Create policies for authenticated users
*/

-- Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Courses Table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  thumbnail TEXT,
  grade TEXT,
  subject TEXT,
  language TEXT DEFAULT 'en',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view courses"
  ON courses
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can insert courses"
  ON courses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (SELECT id FROM profiles WHERE username = 'admin'));

CREATE POLICY "Admins can update courses"
  ON courses
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM profiles WHERE username = 'admin'));

-- Course Contents Table
CREATE TABLE IF NOT EXISTS course_contents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  content TEXT NOT NULL,
  sequence_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE course_contents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view course contents"
  ON course_contents
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can insert course contents"
  ON course_contents
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (SELECT id FROM profiles WHERE username = 'admin'));

CREATE POLICY "Admins can update course contents"
  ON course_contents
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM profiles WHERE username = 'admin'));

-- Enrollments Table
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, course_id)
);

ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their enrollments"
  ON enrollments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can enroll in courses"
  ON enrollments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their enrollment status"
  ON enrollments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Progress Table
CREATE TABLE IF NOT EXISTS progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content_id UUID REFERENCES course_contents(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'not_started',
  completed_at TIMESTAMPTZ,
  last_position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, content_id)
);

ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their progress"
  ON progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert progress records"
  ON progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their progress"
  ON progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to create a profile after sign up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile after sign up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_courses_grade ON courses(grade);
CREATE INDEX IF NOT EXISTS idx_courses_subject ON courses(subject);
CREATE INDEX IF NOT EXISTS idx_courses_language ON courses(language);
CREATE INDEX IF NOT EXISTS idx_courses_featured ON courses(featured);
CREATE INDEX IF NOT EXISTS idx_course_contents_course_id ON course_contents(course_id);
CREATE INDEX IF NOT EXISTS idx_course_contents_sequence_order ON course_contents(sequence_order);
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_progress_user_id ON progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_content_id ON progress(content_id);