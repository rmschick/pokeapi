import { Box, Container, CircularProgress, Typography, Button } from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { usePokemonByName } from '../hooks/usePokemonByName';
import {
  PokemonHero,
  PokemonStats,
  PokemonMoves,
  PokemonAbilities,
  PokemonEvolutions,
  PokemonGenerations,
} from '../components/PokemonDetails';

/**
 * PokemonDetailPage
 * Displays detailed information about a specific Pokemon
 * Route: /pokemon/:name
 */
export const PokemonDetailPage = () => {
  const { name } = useParams<{ name: string }>();
  const pokemon = usePokemonByName(name);
  const isLoading = false;

  // Scroll to top when component mounts or when pokemon changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [name]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!pokemon) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          component={RouterLink}
          to="/pokemon"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3 }}
        >
          Back to Pokémon
        </Button>
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            backgroundColor: '#f5f5f5',
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
            Pokemon Not Found
          </Typography>
          <Typography color="text.secondary" variant="h6">
            Could not find a Pokemon named "{name}"
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            Please return to the Pokemon listing and try again.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Button */}
      <Button
        component={RouterLink}
        to="/pokemon"
        startIcon={<ArrowBackIcon />}
        sx={{
          mb: 3,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateX(-4px)',
          },
        }}
      >
        Back to Pokémon
      </Button>

      {/* Hero Section */}
      <Box
        sx={{
          animation: 'fadeIn 0.5s ease-in',
          '@keyframes fadeIn': {
            from: { opacity: 0, transform: 'translateY(20px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        <PokemonHero
          name={pokemon.name}
          id={pokemon.id}
          image={pokemon.image}
          types={pokemon.type}
          description={pokemon.description}
          height={pokemon.height}
          weight={pokemon.weight}
          cry={pokemon.cry}
        />
      </Box>

      {/* Two Column Layout for Detail Sections */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 3,
          animation: 'fadeIn 0.6s ease-in',
          '@keyframes fadeIn': {
            from: { opacity: 0, transform: 'translateY(20px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        {/* Left Column */}
        <Box>
          <PokemonStats stats={pokemon.stats} />
          <PokemonAbilities abilities={pokemon.abilities} />
        </Box>

        {/* Right Column */}
        <Box>
          <PokemonMoves moves={pokemon.moves} />
          <PokemonEvolutions evolutions={pokemon.evolutions} currentPokemon={pokemon.name} />
          <PokemonGenerations generations={pokemon.generations} />
        </Box>
      </Box>
    </Container>
  );
};
