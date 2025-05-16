import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import CourseCard from '../components/courses/CourseCard';
import { Course } from '../hooks/useFeatureCourses';

const PreschoolPage = () => {
  const { t } = useTranslation();
  
  // Sample preschool courses data
  const preschoolCourses: Course[] = [
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
      title: 'Color Discovery',
      description: 'Explore colors and their meanings through fun activities.',
      thumbnail: 'https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      grade: 'Preschool',
      subject: 'Art',
      language: 'en',
      featured: true,
      created_at: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'Shape Recognition',
      description: 'Learn to identify and draw basic shapes.',
      thumbnail: 'https://images.pexels.com/photos/8612928/pexels-photo-8612928.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      grade: 'Preschool',
      subject: 'Math',
      language: 'en',
      featured: false,
      created_at: new Date().toISOString(),
    },
    {
      id: '5',
      title: 'Social Skills',
      description: 'Learn about friendship, sharing, and being kind.',
      thumbnail: 'https://images.pexels.com/photos/3661264/pexels-photo-3661264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      grade: 'Preschool',
      subject: 'Social',
      language: 'en',
      featured: false,
      created_at: new Date().toISOString(),
    },
    {
      id: '6',
      title: 'Music and Movement',
      description: 'Express yourself through music, dance, and movement.',
      thumbnail: 'https://images.pexels.com/photos/7061252/pexels-photo-7061252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      grade: 'Preschool',
      subject: 'Music',
      language: 'en',
      featured: false,
      created_at: new Date().toISOString(),
    },
  ];

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
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-secondary-dark text-white">
        <div className="container-custom py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('preschool.title')}</h1>
            <p className="text-xl opacity-90">{t('preschool.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {preschoolCourses.map((course) => (
              <motion.div key={course.id} variants={itemVariants}>
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Preschool Education Matters */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Why Preschool Education Matters</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary-light/20 rounded-full p-2 mt-1 mr-4">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Early Development</h3>
                    <p className="text-gray-600">
                      Preschool education stimulates brain development during the critical early years when children's brains are developing rapidly.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-light/20 rounded-full p-2 mt-1 mr-4">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Social Skills</h3>
                    <p className="text-gray-600">
                      Children learn to interact with peers and adults, developing important social and emotional skills.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-light/20 rounded-full p-2 mt-1 mr-4">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Foundation for Learning</h3>
                    <p className="text-gray-600">
                      Early exposure to letters, numbers, shapes, and colors creates a strong foundation for future academic success.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-light/20 rounded-full p-2 mt-1 mr-4">
                    <span className="text-primary font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Language Development</h3>
                    <p className="text-gray-600">
                      Children immersed in language-rich environments develop stronger vocabulary and communication skills.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.pexels.com/photos/8617522/pexels-photo-8617522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Preschool children learning" 
                className="rounded-2xl shadow-lg w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PreschoolPage;