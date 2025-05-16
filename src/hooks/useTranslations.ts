import { useState, useEffect } from 'react';
import { useSupabase } from '../context/SupabaseContext';

interface Translation {
  key: string;
  language: string;
  value: string;
}

export const useTranslations = (language: string) => {
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const { supabase } = useSupabase();

  useEffect(() => {
    const fetchTranslations = async () => {
      const { data, error } = await supabase
        .from('translations')
        .select('key, value')
        .eq('language', language);

      if (error) {
        console.error('Error fetching translations:', error);
        return;
      }

      const translationsMap = data.reduce((acc, { key, value }) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);

      setTranslations(translationsMap);
      setLoading(false);
    };

    fetchTranslations();
  }, [language, supabase]);

  return { translations, loading };
};