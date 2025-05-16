import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, BookOpen } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="container-custom py-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AlertTriangle size={80} className="mx-auto text-warning mb-6" />
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
          <p className="text-xl text-gray-600 max-w-md mx-auto mb-8">
            Oops! The page you're looking for doesn't exist or might have been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="btn btn-primary py-3 px-6 inline-flex items-center justify-center"
            >
              <Home size={18} className="mr-2" />
              Go Home
            </Link>
            <Link
              to="/courses"
              className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 py-3 px-6 inline-flex items-center justify-center"
            >
              <BookOpen size={18} className="mr-2" />
              Browse Courses
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;