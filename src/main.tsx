import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import App from './App.tsx';
import './index.css';
import { SupabaseProvider } from './context/SupabaseContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <SupabaseProvider>
        <App />
      </SupabaseProvider>
    </I18nextProvider>
  </StrictMode>
);