import { useState, useEffect } from 'react';
import { Hero } from '@/lib/schema';

export const useHero = () => {
  const [data, setData] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await fetch('/api/hero');
        const result = await response.json();
        
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.message || 'Failed to fetch hero data');
        }
      } catch (err) {
        setError('An error occurred while fetching hero data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  return { data, loading, error };
};
