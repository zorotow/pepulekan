/*
  # Add sample data and admin user

  1. Initial Data
    - Create admin user
    - Add sample courses with translations
    - Add sample translations for UI elements

  2. Security
    - Ensure admin user has proper permissions
*/

-- Insert admin user
INSERT INTO auth.users (id, email)
VALUES ('00000000-0000-0000-0000-000000000000', 'admin@pepulekan.com')
ON CONFLICT (id) DO NOTHING;

-- Create admin profile
INSERT INTO profiles (id, username, full_name, is_admin)
VALUES ('00000000-0000-0000-0000-000000000000', 'admin', 'System Administrator', true)
ON CONFLICT (id) DO NOTHING;

-- Insert sample courses with translations
INSERT INTO courses (id, title, description, thumbnail, grade, subject, language, featured, title_ckb, description_ckb, title_kmj, description_kmj)
VALUES 
  (
    'c0a80121-1234-5678-90ab-cdef12345678',
    'Alphabet Adventures',
    'Learn the alphabet through fun stories and activities.',
    'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg',
    'Preschool',
    'Language',
    'en',
    true,
    'سەرگوزەشتەکانی ئەلفوبێ',
    'فێربوونی ئەلفوبێ لە ڕێگەی چیرۆک و چالاکی خۆشەوە',
    'Serpêhatiyên Alfabeyê',
    'Bi çîrok û çalakiyên xweş alfabeyê hîn bibin'
  ),
  (
    'c0a80121-9876-5432-10fe-dcba98765432',
    'Number Explorers',
    'Discover the world of numbers through interactive games.',
    'https://images.pexels.com/photos/6326226/pexels-photo-6326226.jpeg',
    'Preschool',
    'Math',
    'en',
    true,
    'کەشفکارانی ژمارە',
    'دۆزینەوەی دنیای ژمارەکان لە ڕێگەی یارییە کارلێکەرەکانەوە',
    'Keşfkerên Hejmaran',
    'Bi rêya lîstikên înterfaîf cîhana hejmaran keşf bikin'
  );

-- Insert sample translations for UI elements
INSERT INTO translations (key, language, value)
VALUES 
  -- English translations
  ('navigation.home', 'en', 'Home'),
  ('navigation.courses', 'en', 'Courses'),
  ('navigation.preschool', 'en', 'Preschool'),
  ('navigation.about', 'en', 'About'),
  ('navigation.contact', 'en', 'Contact'),
  
  -- Sorani Kurdish translations
  ('navigation.home', 'ckb', 'سەرەکی'),
  ('navigation.courses', 'ckb', 'کۆرسەکان'),
  ('navigation.preschool', 'ckb', 'باخچەی ساوایان'),
  ('navigation.about', 'ckb', 'دەربارە'),
  ('navigation.contact', 'ckb', 'پەیوەندی'),
  
  -- Kurmanji Kurdish translations
  ('navigation.home', 'kmj', 'Sereke'),
  ('navigation.courses', 'kmj', 'Kurs'),
  ('navigation.preschool', 'kmj', 'Zarokxane'),
  ('navigation.about', 'kmj', 'Der barê'),
  ('navigation.contact', 'kmj', 'Têkilî')
ON CONFLICT (key, language) DO UPDATE 
SET value = EXCLUDED.value;