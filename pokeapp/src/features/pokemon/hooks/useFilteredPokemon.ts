import { useMemo } from 'react';
import { dummyPokemon } from '../index';

export const useFilteredPokemon = (selectedGenerations: number[], selectedTypes: string[]) => {
  return useMemo(() => {
    return dummyPokemon.filter((pokemon) => {
      // If no generations selected, include all generations
      const generationMatch =
        selectedGenerations.length === 0 || selectedGenerations.some((gen) => pokemon.generations.includes(gen));

      // If no types selected, include all types
      const typeMatch = selectedTypes.length === 0 || selectedTypes.some((type) => pokemon.type.includes(type));

      return generationMatch && typeMatch;
    });
  }, [selectedGenerations, selectedTypes]);
};
