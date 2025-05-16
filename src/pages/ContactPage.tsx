import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';

const ContactPage = () => {
  const { t } = useTranslation();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      // Reset form after success
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }, 1500);
  };

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl opacity-90">
              Have questions about our courses or need assistance? Get in touch with our team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="rounded-full bg-primary-light/20 p-4 w-16 h-16 flex items-center justify-center mb-4">
                <Phone className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-600 mb-2">Call us for general inquiries</p>
              <a href="tel:+964750123456" className="text-primary font-medium hover:underline">
                +964 750 123 456
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="rounded-full bg-secondary-light/20 p-4 w-16 h-16 flex items-center justify-center mb-4">
                <Mail className="text-secondary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-600 mb-2">Email us for customer support</p>
              <a href="mailto:info@pepulekan.com" className="text-primary font-medium hover:underline">
                info@pepulekan.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="rounded-full bg-accent-light/20 p-4 w-16 h-16 flex items-center justify-center mb-4">
                <MapPin className="text-accent" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Office</h3>
              <p className="text-gray-600 mb-2">Visit our main office</p>
              <address className="not-italic text-primary font-medium">
                123 Education Street<br />
                Kurdistan Region
              </address>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below to get in touch with our team. We'll respond to your inquiry as soon as possible.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="courses">Course Information</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="input"
                    placeholder="Your message here..."
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                    className={`btn px-8 py-3 rounded-lg font-medium flex items-center justify-center ${
                      formStatus === 'success' 
                        ? 'bg-success text-white' 
                        : 'bg-primary text-white hover:bg-primary-dark'
                    }`}
                  >
                    {formStatus === 'idle' && (
                      <>
                        <Send size={18} className="mr-2" />
                        Send Message
                      </>
                    )}
                    {formStatus === 'submitting' && (
                      <>
                        <div className="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                        Sending...
                      </>
                    )}
                    {formStatus === 'success' && (
                      <>
                        <Check size={18} className="mr-2" />
                        Message Sent!
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="hidden lg:block"
            >
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Contact us" 
                className="rounded-2xl shadow-lg w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about Pepulekan
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-2">What languages are supported?</h3>
                <p className="text-gray-600">
                  Pepulekan supports English, Sorani Kurdish, and Kurmanji Kurdish across all our courses and learning materials.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-2">How do I access the course materials?</h3>
                <p className="text-gray-600">
                  Once you create an account and enroll in a course, all materials including videos, PDFs, and interactive content will be available in your user dashboard.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-2">Are the courses accessible on mobile devices?</h3>
                <p className="text-gray-600">
                  Yes, Pepulekan is fully responsive and optimized for all devices including smartphones, tablets, and desktop computers.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-2">How do I report technical issues?</h3>
                <p className="text-gray-600">
                  For technical support, please use the contact form above or email us directly at support@pepulekan.com.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;