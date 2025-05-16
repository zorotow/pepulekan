import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Book, Globe, Users, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';
import CourseCard from '../components/courses/CourseCard';
import { useFeatureCourses } from '../hooks/useFeatureCourses';

const HomePage = () => {
  const { t } = useTranslation();
  const { courses, loading, error } = useFeatureCourses();

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

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container-custom py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {t('home.hero.title')}
              </h1>
              <p className="text-xl md:text-2xl opacity-90">
                {t('home.hero.subtitle')}
              </p>
              <div className="pt-2">
                <Link
                  to="/courses"
                  className="btn bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-lg font-medium text-lg inline-flex items-center"
                >
                  {t('home.hero.cta')}
                  <ChevronRight className="ml-2" size={20} />
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <img
                src="https://images.pexels.com/photos/8617855/pexels-photo-8617855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Children learning"
                className="rounded-2xl shadow-xl object-cover h-[500px] w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.features.title')}</h2>
            <div className="h-1 w-20 bg-primary mx-auto"></div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <motion.div variants={itemVariants} className="card p-6">
              <div className="rounded-full bg-primary-light/20 p-3 w-14 h-14 flex items-center justify-center mb-4">
                <Globe className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('home.features.feature1.title')}</h3>
              <p className="text-gray-600">{t('home.features.feature1.description')}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="card p-6">
              <div className="rounded-full bg-secondary-light/20 p-3 w-14 h-14 flex items-center justify-center mb-4">
                <LayoutGrid className="text-secondary" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('home.features.feature2.title')}</h3>
              <p className="text-gray-600">{t('home.features.feature2.description')}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="card p-6">
              <div className="rounded-full bg-accent-light/20 p-3 w-14 h-14 flex items-center justify-center mb-4">
                <Book className="text-accent" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('home.features.feature3.title')}</h3>
              <p className="text-gray-600">{t('home.features.feature3.description')}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="card p-6">
              <div className="rounded-full bg-warning-light/20 p-3 w-14 h-14 flex items-center justify-center mb-4">
                <Users className="text-warning" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('home.features.feature4.title')}</h3>
              <p className="text-gray-600">{t('home.features.feature4.description')}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold">{t('courses.title')}</h2>
              <div className="h-1 w-20 bg-primary mt-2"></div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link 
                to="/courses"
                className="mt-4 md:mt-0 inline-flex items-center text-primary hover:text-primary-dark font-medium"
              >
                View All Courses
                <ChevronRight size={18} className="ml-1" />
              </Link>
            </motion.div>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="text-center text-error py-10">
              <p>Failed to load courses. Please try again later.</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {courses.map((course) => (
                <motion.div key={course.id} variants={itemVariants}>
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Preschool Learning Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('preschool.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('preschool.subtitle')}</p>
            <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="card overflow-hidden"
            >
              <img 
                src="https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Alphabet Adventures" 
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <div className="bg-primary-light/10 text-primary text-xs font-semibold px-2 py-1 rounded inline-block mb-2">
                  {t('grades.preschool')}
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('preschool.categories.alphabet')}</h3>
                <p className="text-gray-600 mb-4">Learn the alphabet through fun stories and activities.</p>
                <Link 
                  to="/preschool/alphabet" 
                  className="text-primary font-medium hover:text-primary-dark flex items-center"
                >
                  Explore Course
                  <ChevronRight size={18} className="ml-1" />
                </Link>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="card overflow-hidden"
            >
              <img 
                src="https://images.pexels.com/photos/6326226/pexels-photo-6326226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Number Explorers" 
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <div className="bg-primary-light/10 text-primary text-xs font-semibold px-2 py-1 rounded inline-block mb-2">
                  {t('grades.preschool')}
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('preschool.categories.numbers')}</h3>
                <p className="text-gray-600 mb-4">Discover the world of numbers through interactive games.</p>
                <Link 
                  to="/preschool/numbers" 
                  className="text-primary font-medium hover:text-primary-dark flex items-center"
                >
                  Explore Course
                  <ChevronRight size={18} className="ml-1" />
                </Link>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="card overflow-hidden"
            >
              <img 
                src="https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Colors and Shapes" 
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <div className="bg-primary-light/10 text-primary text-xs font-semibold px-2 py-1 rounded inline-block mb-2">
                  {t('grades.preschool')}
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('preschool.categories.colors')}</h3>
                <p className="text-gray-600 mb-4">Explore colors and shapes through creative activities.</p>
                <Link 
                  to="/preschool/colors" 
                  className="text-primary font-medium hover:text-primary-dark flex items-center"
                >
                  Explore Course
                  <ChevronRight size={18} className="ml-1" />
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="text-center mt-10">
            <Link
              to="/preschool"
              className="btn btn-primary px-6 py-3 rounded-lg font-medium inline-flex items-center"
            >
              View All Preschool Courses
              <ChevronRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

// Placeholder component until proper implementation
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-32">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);