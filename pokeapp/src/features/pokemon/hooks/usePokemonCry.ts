import { useCallback } from 'react';

/**
 * usePokemonCry
 * Custom hook to handle playing Pokemon cry audio
 * Encapsulates audio logic, error handling, and potential future state management
 *
 * @param cryUrl - The URL of the Pokemon cry audio file
 * @returns playCry function to trigger audio playback
 */
export const usePokemonCry = (cryUrl?: string) => {
  const playCry = useCallback(() => {
    if (!cryUrl) return;

    try {
      const audio = new Audio(cryUrl);
      audio.play().catch((error) => {
        console.error('Failed to play Pokemon cry:', error);
      });
    } catch (error) {
      console.error('Error creating audio element:', error);
    }
  }, [cryUrl]);

  return { playCry, hasCry: !!cryUrl };
};
