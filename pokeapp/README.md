# PokéApp - Frontend

A modern React + TypeScript web application for browsing Pokémon and other data from the PokéAPI.

## Project Architecture

This project uses a **feature-based modular architecture** to ensure scalability, maintainability, and reusability across different data types (Pokémon, Berries, Generations, Items, etc.).

### Directory Structure

```
src/
├── components/
│   ├── AppBar.tsx          # Shared navigation component (used across all features)
│   ├── ItemCard.tsx        # Reusable data card component (agnostic to data type)
│   └── PokeapiIcon.tsx     # Logo component
│
├── features/
│   ├── pokemon/            # Pokemon feature module
│   │   ├── index.ts        # Feature exports (barrel export)
│   │   ├── pages/
│   │   │   └── PokemonPage.tsx           # Page orchestrator - imports and arranges components
│   │   ├── components/
│   │   │   ├── PageHeader/               # Reusable header for pokemon pages
│   │   │   │   ├── index.ts
│   │   │   │   └── PageHeader.tsx
│   │   │   ├── PokemonFilter/            # Filter UI component
│   │   │   │   ├── index.ts
│   │   │   │   └── PokemonFilter.tsx
│   │   │   └── PokemonGrid/              # Grid display component
│   │   │       ├── index.ts
│   │   │       └── PokemonGrid.tsx
│   │   ├── hooks/
│   │   │   └── useFilteredPokemon.ts    # Custom hook for filtering logic
│   │   ├── data/
│   │   │   └── dummyPokemon.ts          # Dummy/static data
│   │   ├── types/
│   │   │   ├── index.ts                 # Pokemon interface & exports
│   │   │   └── typeColors.ts            # Type color mappings
│   │   └── api/                         # API integration (future)
│   │
│   ├── berries/            # Berries feature (follow same pattern)
│   ├── generations/        # Generations feature (follow same pattern)
│   └── [other features]/   # Additional features follow same structure
│
├── pages/
│   └── HomePage.tsx        # Landing/home page
│
├── App.tsx                 # Main app with routing
├── App.css                 # Global styles
├── main.tsx                # React entry point
└── index.css               # Global CSS

```

## Feature Module Pattern

Each feature module follows this consistent pattern:

### Example: Pokemon Feature

**`features/pokemon/index.ts`** - Barrel export for clean imports
```typescript
export { dummyPokemon } from './data/dummyPokemon';
export type { Pokemon } from './types';
export { typeColors } from './types/typeColors';
```

**`features/pokemon/types/index.ts`** - Type definitions
```typescript
export interface Pokemon {
  id: number;
  name: string;
  type: string[];
  image: string;
  height: number;
  weight: number;
}
```

**`features/pokemon/data/dummyPokemon.ts`** - Data layer
```typescript
export const dummyPokemon: Pokemon[] = [
  // Pokemon data here
];
```

**`features/pokemon/pages/PokemonPage.tsx`** - Feature page
- Uses `ItemCard` component from shared components
- Imports data and types from feature module
- Renders feature-specific layout

## Component Composition Pattern

Each feature page uses **component composition** to keep code clean and maintainable:

```typescript
// PokemonPage.tsx - Orchestrator (27 lines)
export const PokemonPage = () => {
  const [selectedGenerations, setSelectedGenerations] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const filteredPokemon = useFilteredPokemon(selectedGenerations, selectedTypes);

  return (
    <Box>
      <Container>
        <PageHeader title="Pokémon Directory" subtitle="Browse and discover..." />
        <PokemonFilter {...filterProps} />
        <PokemonGrid pokemon={filteredPokemon} />
      </Container>
    </Box>
  );
};
```

### Component Breakdown

- **PageHeader** - Reusable header displaying title and subtitle
- **PokemonFilter** - Filter UI (generations + types) with toggle handlers
- **PokemonGrid** - Grid layout rendering ItemCards, handles empty state
- **useFilteredPokemon** - Custom hook encapsulating filter logic

### Benefits of This Pattern

✅ **Separation of Concerns** - Each component has a single responsibility
✅ **Testability** - Small, focused components are easier to unit test
✅ **Reusability** - PageHeader, PokemonFilter can be reused in other views
✅ **Readability** - Page files stay clean, logic lives in appropriate layers
✅ **Scalability** - Easy to add new components (e.g., PokemonSort) without bloating the page

## Component Reusability

### ItemCard Component
A data-agnostic card component used across all features:

```typescript
<ItemCard
  id={pokemon.id}
  name={pokemon.name}
  image={pokreusable components** in `src/features/berries/components/`:
   - BerryFilter (if filtering is needed)
   - BerryGrid (display logic)
   - PageHeader (feature-specific header)

5. **Create custom hooks** in `src/features/berries/hooks/`:
   - useFilteredBerries (if filtering)

6. **Create the feature page** in `src/features/berries/pages/BerriesPage.tsx`:
   ```typescript
   export const BerriesPage = () => {
     // Orchestrate components here
     return (
       <PageHeader ... />
       <BerryFilter ... />
       <BerryGrid ... />
     );
   };
   ```

7. **Create barrel export** in `src/features/berries/index.ts`

8. **Add route** in `src/App.tsx`:
   ```typescript
   <Route path="/berries" element={<BerriesPage />} />
   ```

9
**Benefits:**
- Same visual/interaction design across all features
- Flexible stats system (accepts any key-value pairs)
- Optional type badges for typed items
- Responsive hover effects and animations

## Routing

The app uses **React Router** for navigation:

- `/` - HomePage (landing page)
- `/pokemon` - Pokemon listing and browsing
- `/berries` - Berries feature (to be implemented)
- `/generations` - Generations feature (to be implemented)

## Adding a New Feature

To add a new feature (e.g., Berries):

1. **Create the feature directory structure:**
   ```bash
   mkdir -p src/features/berries/{pages,components,hooks,data,types,api}
   ```

2. **Create type definitions** in `src/features/berries/types/index.ts`

3. **Add dummy data** in `src/features/berries/data/`

4. **Create the feature page** in `src/features/berries/pages/BerriesPage.tsx`

5. **Create barrel export** in `src/features/berries/index.ts`

6. **Add route** in `src/App.tsx`:
   ```typescript
   <Route path="/berries" element={<BerriesPage />} />
   ```

7. **Update navigation** in `src/components/AppBar.tsx` pages array

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Material-UI** - Component library
- **React Router DOM** - Client-side routing
- **Vite** - Build tool

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Future Enhancements

- [ ] Connect to real PokéAPI backend
- [ ] Add search/filter functionality
- [ ] Implement detail pages for items
- [ ] Add caching/state management (Redux, Zustand)
- [ ] Unit and integration tests
- [ ] Dark mode support
