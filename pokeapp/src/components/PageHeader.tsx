import { Box, Typography } from '@mui/material';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h4" component="h1" sx={{ color: 'text.primary', fontWeight: 700, mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        {subtitle}
      </Typography>
    </Box>
  );
};
