import { useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { PageHeader, GenericFilter, type FilterGroup } from '../../../components';
import { ItemCard } from '../../../components/ItemCard';
import { dummyItems, typeColors, ITEMS_OPTIONS } from '../index';
import { Grid } from '@mui/material';

export const ItemsPage = () => {
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);

  const toggleFlavor = (flavor: string | number) => {
    const flavorStr = flavor as string;
    setSelectedFlavors((prev) => (prev.includes(flavorStr) ? prev.filter((f) => f !== flavorStr) : [...prev, flavorStr]));
  };

  const filteredItems =
    selectedFlavors.length === 0
      ? dummyItems
      : dummyItems.filter((item) => selectedFlavors.some((flavor) => item.attributes.includes(flavor)));

  const filterGroups: FilterGroup[] = [
    {
      title: 'Attributes',
      options: ITEMS_OPTIONS,
      selected: selectedFlavors,
      onChange: toggleFlavor,
      colorMap: typeColors,
    },
  ];

  return (
    <Box sx={{ pt: 4, pb: 8, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <PageHeader
          title="Items Directory"
          subtitle="Browse and discover your favorite Items"
        />

        <GenericFilter groups={filterGroups} />

        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          Showing {filteredItems.length} Items
        </Typography>

        <Grid container spacing={3}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                <ItemCard
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  types={item.attributes}
                  typeColors={typeColors}
                  stats={{
                    'Effect': item.effect,
                  }}
                />
              </Grid>
            ))
          ) : (
            <Grid size={{ xs: 12 }}>
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                  No Items found matching the selected filters.
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};
