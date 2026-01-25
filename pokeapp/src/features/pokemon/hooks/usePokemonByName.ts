import { useMemo } from 'react';
import { dummyPokemon } from '../data/dummyPokemon';
import type { Pokemon } from '../types';

/**
 * usePokemonByName
 * Custom hook to find a Pokemon by name (case-insensitive)
 * 
 * @param name - The name of the Pokemon to find
 * @returns Pokemon object if found, null otherwise
 */
export const usePokemonByName = (name: string | undefined): Pokemon | null => {
  return useMemo(() => {
    if (!name) return null;
    
    const normalizedName = name.toLowerCase();
    return dummyPokemon.find(
      (pokemon) => pokemon.name.toLowerCase() === normalizedName
    ) || null;
  }, [name]);
};
