import { useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { PageHeader, GenericFilter, type FilterGroup } from '../../../components';
import { ItemCard } from '../../../components/ItemCard';
import { dummyBerries, typeColors, FLAVOR_OPTIONS } from '../index';
import { Grid } from '@mui/material';

export const BerriesPage = () => {
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);

  const toggleFlavor = (flavor: string | number) => {
    const flavorStr = flavor as string;
    setSelectedFlavors((prev) => (prev.includes(flavorStr) ? prev.filter((f) => f !== flavorStr) : [...prev, flavorStr]));
  };

  const filteredBerries =
    selectedFlavors.length === 0
      ? dummyBerries
      : dummyBerries.filter((berry) => selectedFlavors.some((flavor) => berry.flavors.includes(flavor)));

  const filterGroups: FilterGroup[] = [
    {
      title: 'Flavors',
      options: FLAVOR_OPTIONS,
      selected: selectedFlavors,
      onChange: toggleFlavor,
      colorMap: typeColors,
    },
  ];

  return (
    <Box sx={{ pt: 4, pb: 8, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <PageHeader
          title="Berries Directory"
          subtitle="Browse and discover your favorite Berries"
        />

        <GenericFilter groups={filterGroups} />

        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          Showing {filteredBerries.length} Berries
        </Typography>

        <Grid container spacing={3}>
          {filteredBerries.length > 0 ? (
            filteredBerries.map((berry) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={berry.id}>
                <ItemCard
                  id={berry.id}
                  name={berry.name}
                  image={berry.image}
                  types={berry.flavors}
                  typeColors={typeColors}
                  stats={{
                    'Size': `${berry.size} cm`,
                    'Growth Time': `${berry.growth_time} hours`,
                  }}
                />
              </Grid>
            ))
          ) : (
            <Grid size={{ xs: 12 }}>
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                  No Berries found matching the selected filters.
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};
