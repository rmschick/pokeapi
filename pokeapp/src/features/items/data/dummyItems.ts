import type { Items } from '../types/index';

export const dummyItems: Items[] = [
  {
    id: 1,
    name: 'Master Ball',
    attributes: ['countable', 'consumable', "usable in battle"],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png',
    effect: 'Used in battle : Catches a wild Pokémon without fail. If used in a trainer battle, nothing happens and the ball is lost.',
  },
  {
    id: 2,
    name: 'Antidote',
    attributes: ['countable', 'consumable'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/antidote.png',
    effect: 'Cures poison status.',
  },
  {
    id: 3,
    name: 'Potion',
    attributes: ['countable', 'consumable'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/potion.png',
    effect: 'Restores a small amount of HP.',
  },
];
