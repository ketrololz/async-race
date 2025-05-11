import type { Car } from './car';

export type Winner = {
  wins: string;
  time: string;
} & Car;
