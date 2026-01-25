export interface PokemonBaseStats {
  hp: number;
  attack: number;
  defense: number;
  spAtk: number;
  spDef: number;
  speed: number;
}

export interface Move {
  name: string;
  level: number;
  type: string;
}

export interface Pokemon {
  id: number;
  name: string;
  type: string[];
  image: string;
  height: number;
  weight: number;
  generations: number[];
  // Detail page fields (optional for now, will be populated in Chunk 4)
  description?: string;
  stats?: PokemonBaseStats;
  moves?: Move[];
  abilities?: string[];
  evolutions?: string[];
}

export { typeColors } from './typeColors';
export { GENERATION_OPTIONS, TYPE_OPTIONS } from './filters';
