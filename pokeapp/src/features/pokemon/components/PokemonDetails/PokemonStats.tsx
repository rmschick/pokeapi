import { Box, Typography, LinearProgress, Paper } from '@mui/material';
import type { PokemonBaseStats } from '../../types';

interface PokemonStatsProps {
  stats?: PokemonBaseStats;
}

const statColors: Record<keyof PokemonBaseStats, string> = {
  hp: '#FF5959',
  attack: '#F5AC78',
  defense: '#FAE078',
  spAtk: '#9DB7F5',
  spDef: '#A7DB8D',
  speed: '#FA92B2',
};

const statLabels: Record<keyof PokemonBaseStats, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  spAtk: 'Sp. Atk',
  spDef: 'Sp. Def',
  speed: 'Speed',
};

export const PokemonStats = ({ stats }: PokemonStatsProps) => {
  if (!stats) {
    return (
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Stats
        </Typography>
        <Typography color="text.secondary">No stats available yet.</Typography>
      </Paper>
    );
  }

  const maxStat = 255; // Max stat value in Pokemon
  const total = Object.values(stats).reduce((sum, val) => sum + val, 0);

  return (
    <Paper sx={{ p: 3, mb: 4, transition: 'box-shadow 0.3s ease', '&:hover': { boxShadow: 4 } }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        Base Stats
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {(Object.keys(stats) as Array<keyof PokemonBaseStats>).map((key) => (
          <Box key={key}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '80px' }}>
                {statLabels[key]}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '40px', textAlign: 'right' }}>
                {stats[key]}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(stats[key] / maxStat) * 100}
              sx={{
                height: 8,
                borderRadius: 1,
                backgroundColor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: statColors[key],
                  borderRadius: 1,
                  transition: 'transform 0.8s ease',
                },
              }}
            />
          </Box>
        ))}

        {/* Total Stats */}
        <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #e0e0e0' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              Total
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              {total}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
