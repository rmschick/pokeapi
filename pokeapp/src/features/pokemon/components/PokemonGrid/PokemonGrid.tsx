import { Grid, Box, Typography } from '@mui/material';
import { ItemCard } from '../../../../components/ItemCard';
import { typeColors, type Pokemon } from '../../index';

interface PokemonGridProps {
  pokemon: Pokemon[];
}

export const PokemonGrid = ({ pokemon }: PokemonGridProps) => {
  return (
    <Grid container spacing={3}>
      {pokemon.length > 0 ? (
        pokemon.map((p) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.id}>
            <ItemCard
              id={p.id}
              name={p.name}
              image={p.image}
              href={`/pokemon/${p.name.toLowerCase()}`}
              types={p.type}
              typeColors={typeColors}
              stats={{
                'Height': `${p.height} dm`,
                'Weight': `${p.weight / 10} kg`,
              }}
            />
          </Grid>
        ))
      ) : (
        <Grid size={{ xs: 12 }}>
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              No Pokémon found matching the selected filters.
            </Typography>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};
