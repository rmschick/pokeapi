import { useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { PageHeader, GenericFilter, type FilterGroup } from '../../../components';
import { PokemonGrid } from '../components/PokemonGrid';
import { useFilteredPokemon } from '../hooks/useFilteredPokemon';
import { typeColors, GENERATION_OPTIONS, TYPE_OPTIONS } from '../index';

export const PokemonPage = () => {
  const [selectedGenerations, setSelectedGenerations] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const filteredPokemon = useFilteredPokemon(selectedGenerations, selectedTypes);

  const toggleGeneration = (generation: number | string) => {
    const gen = generation as number;
    setSelectedGenerations((prev) =>
      prev.includes(gen) ? prev.filter((g) => g !== gen) : [...prev, gen]
    );
  };

  const toggleType = (type: string | number) => {
    const typeStr = type as string;
    setSelectedTypes((prev) => (prev.includes(typeStr) ? prev.filter((t) => t !== typeStr) : [...prev, typeStr]));
  };

  const filterGroups: FilterGroup[] = [
    {
      title: 'Generations',
      options: GENERATION_OPTIONS,
      selected: selectedGenerations,
      onChange: toggleGeneration,
    },
    {
      title: 'Types',
      options: TYPE_OPTIONS,
      selected: selectedTypes,
      onChange: toggleType,
      colorMap: typeColors,
    },
  ];

  return (
    <Box sx={{ pt: 4, pb: 8, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <PageHeader
          title="Pokémon Directory"
          subtitle="Browse and discover your favorite Pokémon"
        />

        <GenericFilter groups={filterGroups} />

        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          Showing {filteredPokemon.length} Pokémon
        </Typography>

        <PokemonGrid pokemon={filteredPokemon} />
      </Container>
    </Box>
  );
};
