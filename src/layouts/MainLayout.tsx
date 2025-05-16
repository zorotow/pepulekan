import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';

const MainLayout = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ckb' || i18n.language === 'kmj';

  return (
    <div className={`flex flex-col min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
      <Header />
      <motion.main 
        className="flex-grow"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
};

export default MainLayout;