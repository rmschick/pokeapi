import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';

interface ItemCardProps {
  id: number;
  name: string;
  image: string;
  types?: string[];
  typeColors?: Record<string, string>;
  stats?: Record<string, string | number>;
}

export const ItemCard = ({
  name,
  image,
  types,
  typeColors = {},
  stats,
}: ItemCardProps) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 4,
        },
      }}
    >
      <CardMedia
        component="img"
        height="240"
        image={image}
        alt={name}
        sx={{
          objectFit: 'contain',
          p: 2,
          backgroundColor: '#f5f5f5',
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
          {name}
        </Typography>
        
        {types && types.length > 0 && (
          <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {types.map((t) => (
              <Chip
                key={t}
                label={t}
                size="small"
                sx={{
                  backgroundColor: typeColors[t] || '#999',
                  color: '#fff',
                  fontWeight: 500,
                }}
              />
            ))}
          </Box>
        )}

        {stats && Object.keys(stats).length > 0 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.85rem',
              color: 'text.secondary',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            {Object.entries(stats).map(([key, value]) => (
              <Typography key={key} variant="caption">
                {key}: {value}
              </Typography>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
