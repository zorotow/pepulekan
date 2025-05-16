import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, Book, Play, FileText, Download, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Course } from '../hooks/useFeatureCourses';
import YouTube from 'react-youtube';

// Mock course content types
interface CourseContent {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'quiz';
  content: string; // YouTube ID, PDF URL, or Quiz data
}

const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { t } = useTranslation();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [courseContent, setCourseContent] = useState<CourseContent[]>([]);
  const [activeContent, setActiveContent] = useState<CourseContent | null>(null);

  useEffect(() => {
    // Simulate fetching course details
    const fetchCourseDetails = async () => {
      setLoading(true);
      
      // Sample course data based on courseId
      const sampleCourses: Record<string, Course> = {
        '1': {
          id: '1',
          title: 'Alphabet Adventures',
          description: 'Learn the alphabet through fun stories and activities. This course is designed to help preschool children recognize letters and their sounds through engaging content and interactive exercises.',
          thumbnail: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          grade: 'Preschool',
          subject: 'Language',
          language: 'en',
          featured: true,
          created_at: new Date().toISOString(),
        },
        '2': {
          id: '2',
          title: 'Number Explorers',
          description: 'Discover the world of numbers through interactive games. This course introduces preschool children to numbers 1-10, counting, and basic number recognition through fun activities and games.',
          thumbnail: 'https://images.pexels.com/photos/6326226/pexels-photo-6326226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          grade: 'Preschool',
          subject: 'Math',
          language: 'en',
          featured: true,
          created_at: new Date().toISOString(),
        },
        '3': {
          id: '3',
          title: 'Reading Fundamentals',
          description: 'Build a strong foundation for reading with phonics and sight words. This course helps Grade 1 students develop essential reading skills through a structured approach to phonics, sight words, and comprehension strategies.',
          thumbnail: 'https://images.pexels.com/photos/4861345/pexels-photo-4861345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          grade: 'Grade 1',
          subject: 'Language',
          language: 'en',
          featured: true,
          created_at: new Date().toISOString(),
        },
      };
      
      // Simulate course content based on courseId
      const sampleCourseContent: Record<string, CourseContent[]> = {
        '1': [
          {
            id: 'c1',
            title: 'Introduction to the Alphabet',
            type: 'video',
            content: 'dQw4w9WgXcQ' // This is a placeholder YouTube ID
          },
          {
            id: 'c2',
            title: 'Letters A-F Activities',
            type: 'pdf',
            content: 'https://example.com/alphabet-activities.pdf'
          },
          {
            id: 'c3',
            title: 'Letters G-M Story Time',
            type: 'video',
            content: 'dQw4w9WgXcQ' // This is a placeholder YouTube ID
          },
          {
            id: 'c4',
            title: 'Letters N-S Practice',
            type: 'pdf',
            content: 'https://example.com/alphabet-practice.pdf'
          },
          {
            id: 'c5',
            title: 'Letters T-Z Fun Games',
            type: 'video',
            content: 'dQw4w9WgXcQ' // This is a placeholder YouTube ID
          }
        ],
        '2': [
          {
            id: 'c1',
            title: 'Counting from 1 to 5',
            type: 'video',
            content: 'dQw4w9WgXcQ' // This is a placeholder YouTube ID
          },
          {
            id: 'c2',
            title: 'Number Recognition Activities',
            type: 'pdf',
            content: 'https://example.com/number-activities.pdf'
          },
          {
            id: 'c3',
            title: 'Counting from 6 to 10',
            type: 'video',
            content: 'dQw4w9WgXcQ' // This is a placeholder YouTube ID
          }
        ],
        '3': [
          {
            id: 'c1',
            title: 'Introduction to Phonics',
            type: 'video',
            content: 'dQw4w9WgXcQ' // This is a placeholder YouTube ID
          },
          {
            id: 'c2',
            title: 'Sight Words Practice',
            type: 'pdf',
            content: 'https://example.com/sight-words.pdf'
          },
          {
            id: 'c3',
            title: 'Reading Simple Sentences',
            type: 'video',
            content: 'dQw4w9WgXcQ' // This is a placeholder YouTube ID
          },
          {
            id: 'c4',
            title: 'Comprehension Activities',
            type: 'pdf',
            content: 'https://example.com/comprehension.pdf'
          }
        ]
      };
      
      // Simulate API delay
      setTimeout(() => {
        if (courseId && sampleCourses[courseId]) {
          setCourse(sampleCourses[courseId]);
          setCourseContent(sampleCourseContent[courseId] || []);
          setActiveContent(sampleCourseContent[courseId]?.[0] || null);
          setLoading(false);
        } else {
          // Handle course not found
          setCourse(null);
          setLoading(false);
        }
      }, 800);
    };
    
    fetchCourseDetails();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container-custom py-16 text-center">
        <Book size={64} className="mx-auto mb-4 text-gray-400" />
        <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
        <p className="mb-6">The course you're looking for doesn't exist or has been removed.</p>
        <Link to="/courses" className="btn btn-primary">
          Browse All Courses
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Course Header */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container-custom py-10">
          <Link to="/courses" className="inline-flex items-center text-white/80 hover:text-white mb-6">
            <ChevronLeft size={20} className="mr-1" />
            Back to Courses
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white/10 text-white text-sm font-semibold px-3 py-1 rounded inline-block mb-3">
                  {course.grade} • {course.subject}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
                <p className="text-lg text-white/90 mb-4">{course.description}</p>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-xl overflow-hidden shadow-2xl hidden lg:block"
            >
              <img 
                src={course.thumbnail} 
                alt={course.title} 
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Content Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-5">
                <h3 className="text-xl font-semibold mb-4">Course Content</h3>
                
                <div className="space-y-2">
                  {courseContent.map((content) => (
                    <button
                      key={content.id}
                      className={`w-full text-left p-3 rounded-lg flex items-start ${
                        activeContent?.id === content.id
                          ? 'bg-primary-light/10 text-primary'
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveContent(content)}
                    >
                      <div className="mr-3 mt-1">
                        {content.type === 'video' && <Play size={18} />}
                        {content.type === 'pdf' && <FileText size={18} />}
                      </div>
                      <div>
                        <p className="font-medium">{content.title}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {content.type === 'video' ? 'Video Lesson' : 'PDF Document'}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Content Display */}
            <div className="lg:col-span-2">
              {activeContent ? (
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-5 border-b">
                    <h3 className="text-xl font-semibold">{activeContent.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {activeContent.type === 'video' ? 'Video Lesson' : 'PDF Document'}
                    </p>
                  </div>
                  
                  <div className="p-5">
                    {activeContent.type === 'video' && (
                      <div className="aspect-w-16 aspect-h-9">
                        <YouTube 
                          videoId={activeContent.content} 
                          opts={{ 
                            height: '100%',
                            width: '100%',
                            playerVars: {
                              autoplay: 0,
                            },
                          }}
                          className="rounded-lg overflow-hidden"
                        />
                      </div>
                    )}
                    
                    {activeContent.type === 'pdf' && (
                      <div className="text-center py-10 bg-gray-50 rounded-lg">
                        <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                        <h4 className="text-lg font-medium mb-2">PDF Document</h4>
                        <p className="text-gray-500 mb-4">View or download the PDF document</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <a 
                            href={activeContent.content} 
                            target="_blank" 
                            rel="noreferrer"
                            className="btn btn-primary inline-flex items-center justify-center"
                          >
                            <ExternalLink size={18} className="mr-2" />
                            View PDF
                          </a>
                          <a 
                            href={activeContent.content} 
                            download
                            className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 inline-flex items-center justify-center"
                          >
                            <Download size={18} className="mr-2" />
                            Download
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-md p-10 text-center">
                  <Book size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Content Selected</h3>
                  <p className="text-gray-600">Select a lesson from the course content to begin learning.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseDetailPage;