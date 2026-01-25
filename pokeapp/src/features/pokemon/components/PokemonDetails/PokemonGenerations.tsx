import { Box, Typography, Paper, Chip } from '@mui/material';

interface PokemonGenerationsProps {
  generations: number[];
}

export const PokemonGenerations = ({ generations }: PokemonGenerationsProps) => {
  return (
    <Paper sx={{ p: 3, mb: 4, transition: 'box-shadow 0.3s ease', '&:hover': { boxShadow: 4 } }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        Generations
      </Typography>

      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        {generations.map((gen) => (
          <Chip
            key={gen}
            label={`Gen ${gen}`}
            sx={{
              backgroundColor: '#4caf50',
              color: '#fff',
              fontWeight: 500,
              fontSize: '0.9rem',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: '#45a049',
                transform: 'translateY(-2px)',
                boxShadow: 2,
              },
            }}
          />
        ))}
      </Box>
    </Paper>
  );
};
