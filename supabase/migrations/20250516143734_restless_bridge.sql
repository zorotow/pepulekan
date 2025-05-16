/*
  # Seed Data for Pepulekan Educational Platform

  1. Sample Courses
    - Preschool courses
    - Grade 1-2 courses
  
  2. Course Content
    - Sample videos and PDFs for each course
*/

-- Insert sample courses
INSERT INTO courses (id, title, description, thumbnail, grade, subject, language, featured)
VALUES
  -- Preschool courses
  ('00000000-0000-0000-0000-000000000001', 'Alphabet Adventures', 'Learn the alphabet through fun stories and activities.', 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Preschool', 'Language', 'en', true),
  ('00000000-0000-0000-0000-000000000002', 'Number Explorers', 'Discover the world of numbers through interactive games.', 'https://images.pexels.com/photos/6326226/pexels-photo-6326226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Preschool', 'Math', 'en', true),
  ('00000000-0000-0000-0000-000000000003', 'Color Discovery', 'Explore colors and their meanings through fun activities.', 'https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Preschool', 'Art', 'en', true),
  
  -- Grade 1 courses
  ('00000000-0000-0000-0000-000000000004', 'Reading Fundamentals', 'Build a strong foundation for reading with phonics and sight words.', 'https://images.pexels.com/photos/4861345/pexels-photo-4861345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Grade 1', 'Language', 'en', true),
  ('00000000-0000-0000-0000-000000000005', 'Math Basics', 'Learn addition, subtraction, and basic math concepts.', 'https://images.pexels.com/photos/3771074/pexels-photo-3771074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Grade 1', 'Math', 'en', true),
  
  -- Grade 2 courses
  ('00000000-0000-0000-0000-000000000006', 'Science Explorers', 'Discover the wonders of science through experiments and observations.', 'https://images.pexels.com/photos/8112139/pexels-photo-8112139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Grade 2', 'Science', 'en', true),
  ('00000000-0000-0000-0000-000000000007', 'Creative Writing', 'Express ideas through stories, poems, and creative writing activities.', 'https://images.pexels.com/photos/4348556/pexels-photo-4348556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Grade 2', 'Language', 'en', true)
ON CONFLICT (id) DO NOTHING;

-- Insert sample course content
INSERT INTO course_contents (course_id, title, type, content, sequence_order)
VALUES
  -- Alphabet Adventures content
  ('00000000-0000-0000-0000-000000000001', 'Introduction to the Alphabet', 'video', 'dQw4w9WgXcQ', 1),
  ('00000000-0000-0000-0000-000000000001', 'Letters A-F Activities', 'pdf', 'https://example.com/alphabet-activities.pdf', 2),
  ('00000000-0000-0000-0000-000000000001', 'Letters G-M Story Time', 'video', 'dQw4w9WgXcQ', 3),
  ('00000000-0000-0000-0000-000000000001', 'Letters N-S Practice', 'pdf', 'https://example.com/alphabet-practice.pdf', 4),
  ('00000000-0000-0000-0000-000000000001', 'Letters T-Z Fun Games', 'video', 'dQw4w9WgXcQ', 5),
  
  -- Number Explorers content
  ('00000000-0000-0000-0000-000000000002', 'Counting from 1 to 5', 'video', 'dQw4w9WgXcQ', 1),
  ('00000000-0000-0000-0000-000000000002', 'Number Recognition Activities', 'pdf', 'https://example.com/number-activities.pdf', 2),
  ('00000000-0000-0000-0000-000000000002', 'Counting from 6 to 10', 'video', 'dQw4w9WgXcQ', 3),
  
  -- Reading Fundamentals content
  ('00000000-0000-0000-0000-000000000004', 'Introduction to Phonics', 'video', 'dQw4w9WgXcQ', 1),
  ('00000000-0000-0000-0000-000000000004', 'Sight Words Practice', 'pdf', 'https://example.com/sight-words.pdf', 2),
  ('00000000-0000-0000-0000-000000000004', 'Reading Simple Sentences', 'video', 'dQw4w9WgXcQ', 3),
  ('00000000-0000-0000-0000-000000000004', 'Comprehension Activities', 'pdf', 'https://example.com/comprehension.pdf', 4)
ON CONFLICT DO NOTHING;