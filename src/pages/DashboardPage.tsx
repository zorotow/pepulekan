import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from '../context/SupabaseContext';
import { BookOpen, Clock, GraduationCap } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  subject: string;
  grade: string;
}

interface Enrollment {
  id: string;
  course: Course;
  enrolled_at: string;
  completed_at: string | null;
}

function DashboardPage() {
  const { supabase, user } = useSupabase();
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    async function fetchEnrollments() {
      try {
        const { data: enrollmentData, error } = await supabase
          .from('enrollments')
          .select(`
            id,
            enrolled_at,
            completed_at,
            course:courses (
              id,
              title,
              description,
              thumbnail,
              subject,
              grade
            )
          `)
          .eq('user_id', user.id);

        if (error) throw error;
        setEnrollments(enrollmentData || []);
      } catch (error) {
        console.error('Error fetching enrollments:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEnrollments();
  }, [user, supabase, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">My Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">Enrolled Courses</h3>
                <p className="text-2xl font-bold text-blue-600">{enrollments.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">Completed</h3>
                <p className="text-2xl font-bold text-green-600">
                  {enrollments.filter(e => e.completed_at).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 p-6 rounded-lg">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">In Progress</h3>
                <p className="text-2xl font-bold text-yellow-600">
                  {enrollments.filter(e => !e.completed_at).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Courses</h2>
        {enrollments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">You haven't enrolled in any courses yet.</p>
            <button
              onClick={() => navigate('/courses')}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((enrollment) => (
              <div key={enrollment.id} className="bg-gray-50 rounded-lg overflow-hidden">
                {enrollment.course.thumbnail && (
                  <img
                    src={enrollment.course.thumbnail}
                    alt={enrollment.course.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {enrollment.course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {enrollment.course.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {enrollment.completed_at ? 'Completed' : 'In Progress'}
                    </span>
                    <button
                      onClick={() => navigate(`/courses/${enrollment.course.id}`)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      {enrollment.completed_at ? 'Review' : 'Continue'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;