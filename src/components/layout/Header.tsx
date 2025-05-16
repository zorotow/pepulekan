import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown, Book, Users, Home, Phone, LogIn, UserPlus } from 'lucide-react';
import { useSupabase } from '../../context/SupabaseContext';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSelector from '../common/LanguageSelector';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const { user, signOut } = useSupabase();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    closeMenu();
  };

  const navLinks = [
    { name: t('navigation.home'), path: '/', icon: <Home size={18} /> },
    { name: t('navigation.courses'), path: '/courses', icon: <Book size={18} /> },
    { name: t('navigation.preschool'), path: '/preschool', icon: <Users size={18} /> },
    { name: t('navigation.about'), path: '/about', icon: <Users size={18} /> },
    { name: t('navigation.contact'), path: '/contact', icon: <Phone size={18} /> },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-primary flex items-center gap-2"
            >
              <Book className="h-8 w-8" />
              <span>Pepulekan</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-gray-700 hover:text-primary hover:bg-gray-100'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            <LanguageSelector />

            <div className="flex items-center space-x-2 ml-4">
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="btn btn-primary flex items-center gap-1"
                >
                  <LogIn size={18} />
                  <span>{t('navigation.logout')}</span>
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn btn-secondary flex items-center gap-1"
                  >
                    <LogIn size={18} />
                    <span>{t('navigation.login')}</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="btn btn-primary flex items-center gap-1"
                  >
                    <UserPlus size={18} />
                    <span>{t('navigation.signup')}</span>
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <LanguageSelector isMobile={true} />
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="py-3 px-4 space-y-3 bg-white border-t shadow-lg">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={`flex items-center space-x-2 p-2 rounded-md ${
                    location.pathname === link.path
                      ? 'text-primary bg-primary-light/10'
                      : 'text-gray-700 hover:text-primary hover:bg-gray-100'
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}

              {user ? (
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center space-x-2 p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100"
                >
                  <LogIn size={18} />
                  <span>{t('navigation.logout')}</span>
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="flex items-center space-x-2 p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100"
                  >
                    <LogIn size={18} />
                    <span>{t('navigation.login')}</span>
                  </Link>
                  <Link
                    to="/signup"
                    onClick={closeMenu}
                    className="flex items-center space-x-2 p-2 rounded-md text-primary bg-primary-light/10"
                  >
                    <UserPlus size={18} />
                    <span>{t('navigation.signup')}</span>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;