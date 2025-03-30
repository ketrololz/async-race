import type { Engine } from "./engine";

export type Car = {
  id: number;
  name: string;
  color: string;
  engine?: Engine
};
