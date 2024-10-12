export interface Stats {
  strength: number;
  hp: number;
  defense: number;
  intelligence: number;
  arcanaPower: number;
}

export type StatKey = keyof Stats;

export interface Character {
  stats: Stats;
}

export type Scene = 'train' | 'fight' | 'character' | 'shop';

export interface User {
  id: number;
  username: string;
  password: string;
  character: Character;
}