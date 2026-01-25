import { Box, Typography, Paper, Chip } from '@mui/material';
import { typeColors } from '../../types/typeColors';
import type { Move } from '../../types';

interface PokemonMovesProps {
  moves?: Move[];
}

export const PokemonMoves = ({ moves }: PokemonMovesProps) => {
  if (!moves || moves.length === 0) {
    return (
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Moves
        </Typography>
        <Typography color="text.secondary">No moves available yet.</Typography>
      </Paper>
    );
  }

  // Sort moves by level
  const sortedMoves = [...moves].sort((a, b) => a.level - b.level);

  return (
    <Paper sx={{ p: 3, mb: 4, transition: 'box-shadow 0.3s ease', '&:hover': { boxShadow: 4 } }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        Moves
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {sortedMoves.map((move, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 1.5,
              backgroundColor: '#f9f9f9',
              borderRadius: 1,
              flexWrap: 'wrap',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: '#f0f0f0',
                transform: 'translateX(4px)',
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                minWidth: '50px',
                fontWeight: 600,
                color: 'text.secondary',
              }}
            >
              Lv. {move.level}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                flex: 1,
                fontWeight: 500,
                minWidth: '150px',
              }}
            >
              {move.name}
            </Typography>
            <Chip
              label={move.type}
              size="small"
              sx={{
                backgroundColor: typeColors[move.type] || '#999',
                color: '#fff',
                fontWeight: 500,
              }}
            />
          </Box>
        ))}
      </Box>
    </Paper>
  );
};
