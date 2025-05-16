import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Book, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Book className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-white">Pepulekan</span>
            </Link>
            <p className="text-sm text-gray-400 mt-2">
              An educational platform designed for preschool and early grade learners,
              offering courses in multiple languages.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  {t('navigation.home')}
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-primary transition-colors">
                  {t('navigation.courses')}
                </Link>
              </li>
              <li>
                <Link to="/preschool" className="hover:text-primary transition-colors">
                  {t('navigation.preschool')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  {t('navigation.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  {t('navigation.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Grades */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Grades</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/preschool" className="hover:text-primary transition-colors">
                  {t('grades.preschool')}
                </Link>
              </li>
              <li>
                <Link to="/courses?grade=1" className="hover:text-primary transition-colors">
                  {t('grades.grade1')}
                </Link>
              </li>
              <li>
                <Link to="/courses?grade=2" className="hover:text-primary transition-colors">
                  {t('grades.grade2')}
                </Link>
              </li>
              <li>
                <Link to="/courses?grade=3" className="hover:text-primary transition-colors">
                  {t('grades.grade3')}
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-primary font-medium">
                  View All Grades
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>123 Education Street, Kurdistan Region</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="flex-shrink-0" />
                <span>+964 750 123 4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="flex-shrink-0" />
                <span>info@pepulekan.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            {t('footer.rights')}
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-primary">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="text-sm text-gray-500 hover:text-primary">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;