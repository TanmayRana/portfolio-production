import { useState, useEffect } from 'react';
import { MyExperience } from '@/lib/schema';

export const useMyExpertise = () => {
  const [data, setData] = useState<MyExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpertise = async () => {
      try {
        const response = await fetch('/api/my-expertise');
        const result = await response.json();
        
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.message || 'Failed to fetch my expertise data');
        }
      } catch (err) {
        setError('An error occurred while fetching my expertise data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpertise();
  }, []);

  return { data, loading, error };
};
