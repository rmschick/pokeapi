import { Box, Typography, Paper, Chip } from '@mui/material';

interface PokemonAbilitiesProps {
  abilities?: string[];
}

export const PokemonAbilities = ({ abilities }: PokemonAbilitiesProps) => {
  if (!abilities || abilities.length === 0) {
    return (
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Abilities
        </Typography>
        <Typography color="text.secondary">No abilities available yet.</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, mb: 4, transition: 'box-shadow 0.3s ease', '&:hover': { boxShadow: 4 } }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        Abilities
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {abilities.map((ability, index) => (
          <Chip
            key={index}
            label={ability}
            sx={{
              backgroundColor: '#1976d2',
              color: '#fff',
              fontWeight: 500,
              fontSize: '0.95rem',
              px: 2,
              py: 2.5,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: '#1565c0',
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
