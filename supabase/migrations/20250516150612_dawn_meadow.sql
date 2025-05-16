/*
  # Add multilingual support and admin authentication

  1. New Tables
    - `translations`
      - `id` (uuid, primary key)
      - `key` (text) - Translation key
      - `language` (text) - Language code (en, ckb, kmj)
      - `value` (text) - Translated text
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Changes to existing tables
    - Add language-specific columns to courses table
    - Add admin flag to profiles table

  3. Security
    - Enable RLS
    - Add policies for admin access
*/

-- Add language-specific columns to courses
ALTER TABLE courses ADD COLUMN IF NOT EXISTS title_ckb text;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS title_kmj text;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS description_ckb text;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS description_kmj text;

-- Add translations table
CREATE TABLE IF NOT EXISTS translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL,
  language text NOT NULL,
  value text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(key, language)
);

-- Add admin flag to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin boolean DEFAULT false;

-- Enable RLS on translations
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;

-- Policies for translations
CREATE POLICY "Anyone can read translations"
  ON translations
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Only admins can modify translations"
  ON translations
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Update courses policies for admin access
CREATE POLICY "Admins can modify courses"
  ON courses
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );