import type { Car } from '../components/car';

export type Winner = {
  wins: string;
  time: string;
} & Car;
