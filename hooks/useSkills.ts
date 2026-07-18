import { useState, useEffect } from 'react';
import { SkillCategory, Skill } from '@/lib/schema';

export interface SkillCategoryWithSkills extends SkillCategory {
  skills: Skill[];
}

export const useSkills = () => {
  const [data, setData] = useState<SkillCategoryWithSkills[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/skills');
        const result = await response.json();
        
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.message || 'Failed to fetch skills data');
        }
      } catch (err) {
        setError('An error occurred while fetching skills data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return { data, loading, error };
};
