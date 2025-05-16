import React, { useState, useEffect } from 'react';
import { useSupabase } from '../context/SupabaseContext';
import { motion } from 'framer-motion';
import { Book, Clock, CheckCircle, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Enrollment {
  id: string;
  course: {
    id: string;
    title: string;
    thumbnail: string;
    grade: string;
    subject: string;
  };
  enrolled_at: string;
  completed_at: string | null;
}

const DashboardPage = () => {
  const { supabase, user } = useSupabase();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);

        // Fetch enrollments with course details
        const { data: enrollmentsData, error: enrollmentsError } = await supabase
          .from('enrollments')
          .select(`
            id,
            enrolled_at,
            completed_at,
            course:courses (
              id,
              title,
              thumbnail,
              grade,
              subject
            )
          `)
          .eq('user_id', user.id);

        if (enrollmentsError) throw enrollmentsError;
        setEnrollments(enrollmentsData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, supabase]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      {/* Profile Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="bg-primary-light/20 p-4 rounded-full">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{profile?.full_name || 'Welcome!'}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Enrolled Courses</p>
              <h3 className="text-3xl font-bold">{enrollments.length}</h3>
            </div>
            <div className="bg-primary-light/20 p-3 rounded-full">
              <Book className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">In Progress</p>
              <h3 className="text-3xl font-bold">
                {enrollments.filter(e => !e.completed_at).length}
              </h3>
            </div>
            <div className="bg-warning-light/20 p-3 rounded-full">
              <Clock className="h-6 w-6 text-warning" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Completed</p>
              <h3 className="text-3xl font-bold">
                {enrollments.filter(e => e.completed_at).length}
              </h3>
            </div>
            <div className="bg-success-light/20 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
          </div>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold mb-6">My Courses</h3>
        
        {enrollments.length === 0 ? (
          <div className="text-center py-12">
            <Book className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h4>
            <p className="text-gray-600 mb-4">Start learning by enrolling in a course</p>
            <Link to="/courses" className="btn btn-primary">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((enrollment) => (
              <motion.div
                key={enrollment.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg border shadow-sm overflow-hidden"
              >
                <img
                  src={enrollment.course.thumbnail}
                  alt={enrollment.course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-primary">
                      {enrollment.course.grade}
                    </span>
                    {enrollment.completed_at ? (
                      <span className="text-sm font-medium text-success flex items-center">
                        <CheckCircle size={14} className="mr-1" />
                        Completed
                      </span>
                    ) : (
                      <span className="text-sm font-medium text-warning flex items-center">
                        <Clock size={14} className="mr-1" />
                        In Progress
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{enrollment.course.title}</h4>
                  <Link
                    to={`/courses/${enrollment.course.id}`}
                    className="text-primary hover:text-primary-dark font-medium text-sm"
                  >
                    Continue Learning
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;