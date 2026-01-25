import { Box, Typography, Chip, IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { typeColors } from '../../types/typeColors';
import { usePokemonCry } from '../../hooks/usePokemonCry';

interface PokemonHeroProps {
  name: string;
  id: number;
  image: string;
  types: string[];
  description?: string;
  height: number;
  weight: number;
  cry?: string;
}

export const PokemonHero = ({ name, id, image, types, description, height, weight, cry }: PokemonHeroProps) => {
  const { playCry, hasCry } = usePokemonCry(cry);

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          alignItems: { xs: 'center', md: 'flex-start' },
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            flex: '0 0 auto',
            width: { xs: '100%', md: '400px' },
            maxWidth: '400px',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#f5f5f5',
              borderRadius: 2,
              p: 3,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'all 0.3s ease',
              '&:hover img': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <img
              src={image}
              alt={name}
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: '300px',
                transition: 'transform 0.3s ease',
              }}
            />
          </Box>
        </Box>

        {/* Info Section */}
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              {name}
            </Typography>
            {hasCry && (
              <IconButton
                onClick={playCry}
                sx={{
                  color: '#FFD700',
                  backgroundColor: 'rgba(255, 215, 0, 0.1)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 215, 0, 0.2)',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <VolumeUpIcon />
              </IconButton>
            )}
          </Box>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            #{String(id).padStart(3, '0')}
          </Typography>

          {/* Types */}
          <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {types.map((type) => (
              <Chip
                key={type}
                label={type}
                sx={{
                  backgroundColor: typeColors[type] || '#999',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '1rem',
                  px: 2,
                  py: 2.5,
                }}
              />
            ))}
          </Box>

          {/* Description */}
          {description && (
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              {description}
            </Typography>
          )}

          {/* Physical Stats */}
          <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Height
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {height / 10} m
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Weight
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {weight / 10} kg
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
