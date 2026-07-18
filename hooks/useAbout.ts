import { useState, useEffect } from 'react';
import { About, Contact } from '@/lib/schema';

export interface AboutDataResponse {
  about: About | null;
  imageUrl: string | null;
  contact: Contact | null;
}

export const useAbout = () => {
  const [data, setData] = useState<AboutDataResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await fetch('/api/about');
        const result = await response.json();
        
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.message || 'Failed to fetch about data');
        }
      } catch (err) {
        setError('An error occurred while fetching about data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  return { data, loading, error };
};
