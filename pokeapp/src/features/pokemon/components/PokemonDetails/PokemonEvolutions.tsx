import { Box, Typography, Paper, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface PokemonEvolutionsProps {
  evolutions?: string[];
  currentPokemon: string;
}

export const PokemonEvolutions = ({ evolutions, currentPokemon }: PokemonEvolutionsProps) => {
  if (!evolutions || evolutions.length === 0) {
    return (
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Evolution Chain
        </Typography>
        <Typography color="text.secondary">No evolution data available yet.</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, mb: 4, transition: 'box-shadow 0.3s ease', '&:hover': { boxShadow: 4 } }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        Evolution Chain
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {evolutions.map((evolution, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <RouterLink
              to={`/pokemon/${evolution.toLowerCase()}`}
              style={{ textDecoration: 'none' }}
            >
              <Chip
                label={evolution}
                sx={{
                  backgroundColor: evolution.toLowerCase() === currentPokemon.toLowerCase() ? '#1976d2' : '#f5f5f5',
                  color: evolution.toLowerCase() === currentPokemon.toLowerCase() ? '#fff' : '#000',
                  fontWeight: 600,
                  fontSize: '1rem',
                  px: 3,
                  py: 3,
                  border: evolution.toLowerCase() === currentPokemon.toLowerCase() ? 'none' : '2px solid #e0e0e0',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 2,
                  },
                }}
              />
            </RouterLink>
            {index < evolutions.length - 1 && (
              <ArrowForwardIcon sx={{ color: 'text.secondary' }} />
            )}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};
