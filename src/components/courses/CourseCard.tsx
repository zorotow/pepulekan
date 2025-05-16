import React from 'react';
import { Link } from 'react-router-dom';
import { Book, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Course } from '../../hooks/useFeatureCourses';
import { useTranslation } from 'react-i18next';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { t, i18n } = useTranslation();
  
  // Translate grade if available in translations
  const getGradeTranslation = (grade: string) => {
    const gradeKey = grade.toLowerCase().replace(/\s+/g, '');
    const translationKey = `grades.${gradeKey}`;
    
    // Check if translation exists, otherwise use original grade
    return t(translationKey) !== translationKey ? t(translationKey) : grade;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="card overflow-hidden h-full flex flex-col"
    >
      <div className="relative">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
          <Link 
            to={`/courses/${course.id}`}
            className="text-white font-medium p-4 flex items-center"
          >
            View Course
            <ChevronRight size={18} className="ml-1" />
          </Link>
        </div>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <div className="bg-primary-light/10 text-primary text-xs font-semibold px-2 py-1 rounded inline-block mb-2">
          {getGradeTranslation(course.grade)}
        </div>
        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{course.description}</p>
        <Link 
          to={`/courses/${course.id}`} 
          className="text-primary font-medium hover:text-primary-dark flex items-center mt-2"
        >
          Learn More
          <ChevronRight size={18} className="ml-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default CourseCard;