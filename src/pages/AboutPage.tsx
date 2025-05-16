import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Star, Award, Lightbulb, Clock } from 'lucide-react';

const AboutPage = () => {
  const { t } = useTranslation();
  
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container-custom py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Pepulekan</h1>
            <p className="text-xl opacity-90">
              Empowering children through multilingual education and interactive learning
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Pepulekan was founded with a simple yet powerful vision: to make quality education 
                  accessible to all children in the Kurdish regions and beyond, regardless of their 
                  geographical location or primary language.
                </p>
                <p className="text-gray-700">
                  Our journey began when a group of passionate educators recognized the need for 
                  multilingual educational resources that could serve the diverse linguistic needs 
                  of children in the region. With Kurdish (both Sorani and Kurmanji dialects) and 
                  English as our core languages, we set out to build a platform that would bridge 
                  educational gaps.
                </p>
                <p className="text-gray-700">
                  Today, Pepulekan offers a comprehensive curriculum from preschool to grade 11, 
                  with special emphasis on early childhood education. Our interactive approach to 
                  learning makes education engaging, fun, and effective for children of all ages.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.pexels.com/photos/8467280/pexels-photo-8467280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Children learning" 
                className="rounded-2xl shadow-lg w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To provide high-quality, accessible education that celebrates linguistic diversity and nurtures the intellectual growth of every child.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <div className="bg-primary-light/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Education</h3>
              <p className="text-gray-600">
                We provide curriculum-aligned content developed by experienced educators.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <div className="bg-secondary-light/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="text-secondary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multilingual Approach</h3>
              <p className="text-gray-600">
                We celebrate linguistic diversity with content in English, Sorani, and Kurmanji.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <div className="bg-accent-light/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="text-accent" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
              <p className="text-gray-600">
                We make education engaging through interactive content and activities.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <div className="bg-warning-light/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="text-warning" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accessible Anytime</h3>
              <p className="text-gray-600">
                We provide 24/7 access to educational resources from any device.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the passionate educators and technologists behind Pepulekan
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img 
                src="https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Sarah Johnson" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Sarah Johnson</h3>
                <p className="text-primary mb-3">Curriculum Director</p>
                <p className="text-gray-600">
                  With over 15 years in education, Sarah leads our curriculum development team.
                </p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img 
                src="https://images.pexels.com/photos/8197483/pexels-photo-8197483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Ahmed Rahman" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Ahmed Rahman</h3>
                <p className="text-primary mb-3">Language Specialist</p>
                <p className="text-gray-600">
                  Ahmed ensures the quality of our Kurdish language content and translations.
                </p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img 
                src="https://images.pexels.com/photos/5212326/pexels-photo-5212326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Maria Rodriguez" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Maria Rodriguez</h3>
                <p className="text-primary mb-3">Early Childhood Education Expert</p>
                <p className="text-gray-600">
                  Maria specializes in creating engaging content for our youngest learners.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;