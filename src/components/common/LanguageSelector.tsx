import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LanguageSelectorProps {
  isMobile?: boolean;
}

const LanguageSelector = ({ isMobile = false }: LanguageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ckb', name: 'سۆرانی' },
    { code: 'kmj', name: 'Kurmancî' },
  ];

  const getCurrentLanguageName = () => {
    return languages.find(lang => lang.code === i18n.language)?.name || 'English';
  };

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -5 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <div className="relative">
      <button
        className={`flex items-center gap-1 p-2 rounded-lg text-sm font-medium transition-colors ${
          isMobile ? 'text-gray-700 mr-2' : 'text-gray-700 hover:text-primary hover:bg-gray-100'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe size={18} />
        {!isMobile && (
          <>
            <span>{getCurrentLanguageName()}</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
            transition={{ duration: 0.2 }}
            className={`absolute ${
              i18n.language === 'ckb' || i18n.language === 'kmj' ? 'right-0' : 'left-0'
            } mt-2 w-40 bg-white rounded-lg shadow-lg py-1 z-50`}
          >
            {languages.map((language) => (
              <button
                key={language.code}
                className={`w-full text-left px-4 py-2 text-sm ${
                  i18n.language === language.code
                    ? 'bg-primary-light/10 text-primary font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => handleLanguageChange(language.code)}
              >
                {language.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;