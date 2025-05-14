
import { useState } from 'react';
import { getLegalAdvice } from '@/services/legalAI';
import { toast } from "sonner";

export interface UseLegalAIProps {
  onError?: (error: Error) => void;
}

export interface UseLegalAIReturn {
  getAdvice: (query: string) => Promise<string | null>;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook to interact with the Legal AI service
 */
export const useLegalAI = ({ onError }: UseLegalAIProps = {}): UseLegalAIReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const getAdvice = async (query: string): Promise<string | null> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await getLegalAdvice(query);
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);
      
      if (onError) {
        onError(error);
      } else {
        toast.error('Failed to get legal advice', {
          description: error.message
        });
      }
      
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    getAdvice,
    isLoading,
    error
  };
};
