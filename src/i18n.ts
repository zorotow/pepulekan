import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import ckbTranslation from './locales/ckb.json';
import kmjTranslation from './locales/kmj.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      ckb: {
        translation: ckbTranslation,
      },
      kmj: {
        translation: kmjTranslation,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;