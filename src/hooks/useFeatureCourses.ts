import { useState, useEffect } from 'react';
import { useSupabase } from '../context/SupabaseContext';

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  grade: string;
  subject: string;
  language: string;
  featured: boolean;
  created_at: string;
}

export const useFeatureCourses = (limit = 6) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { supabase } = useSupabase();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        
        // This is a placeholder until we have real data from Supabase
        // Replace with actual Supabase query once database is set up
        
        // Sample data for development
        const sampleCourses: Course[] = [
          {
            id: '1',
            title: 'Alphabet Adventures',
            description: 'Learn the alphabet through fun stories and activities.',
            thumbnail: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            grade: 'Preschool',
            subject: 'Language',
            language: 'en',
            featured: true,
            created_at: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'Number Explorers',
            description: 'Discover the world of numbers through interactive games.',
            thumbnail: 'https://images.pexels.com/photos/6326226/pexels-photo-6326226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            grade: 'Preschool',
            subject: 'Math',
            language: 'en',
            featured: true,
            created_at: new Date().toISOString(),
          },
          {
            id: '3',
            title: 'Reading Fundamentals',
            description: 'Build a strong foundation for reading with phonics and sight words.',
            thumbnail: 'https://images.pexels.com/photos/4861345/pexels-photo-4861345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            grade: 'Grade 1',
            subject: 'Language',
            language: 'en',
            featured: true,
            created_at: new Date().toISOString(),
          },
          {
            id: '4',
            title: 'Math Basics',
            description: 'Learn addition, subtraction, and basic math concepts.',
            thumbnail: 'https://images.pexels.com/photos/3771074/pexels-photo-3771074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            grade: 'Grade 1',
            subject: 'Math',
            language: 'en',
            featured: true,
            created_at: new Date().toISOString(),
          },
          {
            id: '5',
            title: 'Science Explorers',
            description: 'Discover the wonders of science through experiments and observations.',
            thumbnail: 'https://images.pexels.com/photos/8112139/pexels-photo-8112139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            grade: 'Grade 2',
            subject: 'Science',
            language: 'en',
            featured: true,
            created_at: new Date().toISOString(),
          },
          {
            id: '6',
            title: 'Creative Writing',
            description: 'Express ideas through stories, poems, and creative writing activities.',
            thumbnail: 'https://images.pexels.com/photos/4348556/pexels-photo-4348556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            grade: 'Grade 2',
            subject: 'Language',
            language: 'en',
            featured: true,
            created_at: new Date().toISOString(),
          },
        ];

        // Simulate loading delay for development
        setTimeout(() => {
          setCourses(sampleCourses.slice(0, limit));
          setLoading(false);
        }, 1000);

        // TODO: Replace with real Supabase query
        // Example of how to fetch from Supabase once database is set up:
        /*
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('featured', true)
          .order('created_at', { ascending: false })
          .limit(limit);

        if (error) {
          throw error;
        }

        setCourses(data || []);
        */
        
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, [limit, supabase]);

  return { courses, loading, error };
};