import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Book } from 'lucide-react';
import CourseCard from '../components/courses/CourseCard';
import { Course } from '../hooks/useFeatureCourses';

const CoursesPage = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState(searchParams.get('grade') || 'all');

  // Sample courses data for all grades
  useEffect(() => {
    // Simulate API call for fetching courses
    const fetchCourses = async () => {
      setLoading(true);
      
      // Sample data
      const allCourses: Course[] = [
        // Preschool courses
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
        // Grade 1 courses
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
        // Grade 2 courses
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
        // More courses for other grades
        {
          id: '7',
          title: 'Intermediate Mathematics',
          description: 'Advanced math concepts including multiplication and division.',
          thumbnail: 'https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          grade: 'Grade 3',
          subject: 'Math',
          language: 'en',
          featured: false,
          created_at: new Date().toISOString(),
        },
        {
          id: '8',
          title: 'Geography Basics',
          description: 'Introduction to maps, continents, and geographical features.',
          thumbnail: 'https://images.pexels.com/photos/2098428/pexels-photo-2098428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          grade: 'Grade 3',
          subject: 'Social Studies',
          language: 'en',
          featured: false,
          created_at: new Date().toISOString(),
        },
        {
          id: '9',
          title: 'Advanced Reading',
          description: 'Comprehensive reading skills and literary analysis for older students.',
          thumbnail: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          grade: 'Grade 4',
          subject: 'Language',
          language: 'en',
          featured: false,
          created_at: new Date().toISOString(),
        },
      ];
      
      // Simulate network delay
      setTimeout(() => {
        setCourses(allCourses);
        setLoading(false);
      }, 800);
    };
    
    fetchCourses();
  }, []);

  // Filter courses based on search term and selected grade
  useEffect(() => {
    let filtered = [...courses];
    
    // Filter by grade
    if (selectedGrade !== 'all') {
      filtered = filtered.filter(course => course.grade === selectedGrade);
    }
    
    // Filter by search term
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        course.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        course.subject.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    
    setFilteredCourses(filtered);
  }, [courses, searchTerm, selectedGrade]);

  // Update URL when grade changes
  useEffect(() => {
    if (selectedGrade === 'all') {
      searchParams.delete('grade');
    } else {
      searchParams.set('grade', selectedGrade);
    }
    setSearchParams(searchParams);
  }, [selectedGrade, searchParams, setSearchParams]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Available grades for filter
  const grades = [
    { value: 'all', label: t('courses.allGrades') },
    { value: 'Preschool', label: t('grades.preschool') },
    { value: 'Grade 1', label: t('grades.grade1') },
    { value: 'Grade 2', label: t('grades.grade2') },
    { value: 'Grade 3', label: t('grades.grade3') },
    { value: 'Grade 4', label: t('grades.grade4') },
    { value: 'Grade 5', label: t('grades.grade5') },
    { value: 'Grade 6', label: t('grades.grade6') },
    { value: 'Grade 7', label: t('grades.grade7') },
    { value: 'Grade 8', label: t('grades.grade8') },
    { value: 'Grade 9', label: t('grades.grade9') },
    { value: 'Grade 10', label: t('grades.grade10') },
    { value: 'Grade 11', label: t('grades.grade11') },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container-custom py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Book size={48} className="mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('courses.title')}</h1>
            <p className="text-xl opacity-90">Explore our comprehensive curriculum from preschool to grade 11</p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            {/* Search Bar */}
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder={t('courses.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 w-full"
              />
            </div>
            
            {/* Grade Filter */}
            <div className="relative">
              <div className="flex items-center">
                <Filter size={18} className="mr-2 text-gray-600" />
                <span className="text-sm font-medium text-gray-600 mr-2">{t('courses.filter')}</span>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="input py-2"
                >
                  {grades.map((grade) => (
                    <option key={grade.value} value={grade.value}>
                      {grade.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-20">
              <Book size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-2xl font-semibold mb-2">No courses found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCourses.map((course) => (
                <motion.div key={course.id} variants={itemVariants}>
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default CoursesPage;