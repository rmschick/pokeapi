export interface Pokemon {
  id: number;
  name: string;
  type: string[];
  image: string;
  height: number;
  weight: number;
  generations: number[];
}

export { typeColors } from './typeColors';
export { GENERATION_OPTIONS, TYPE_OPTIONS } from './filters';
