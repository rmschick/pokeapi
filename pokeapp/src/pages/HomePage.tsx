import { Container, Box, Typography } from '@mui/material';

export const HomePage = () => {
  return (
    <Box sx={{ pt: 4, pb: 8, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
            Welcome to PokéAPI
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Explore the world of Pokémon and discover detailed information about your favorite creatures.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
