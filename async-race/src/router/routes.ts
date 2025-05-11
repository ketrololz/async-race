import type { Garage } from '../pages/garage/garage.ts';
import type { Winners } from '../pages/winners/winners.ts';

export const ROUTES = [
  {
    name: 'Garage',
    path: '/',
    page: (): Promise<Garage> =>
      import('../pages/garage/garage.ts').then(
        (module) => new module.Garage(),
      ),
  },
  {
    name: 'Winners',
    path: '/winners',
    page: (): Promise<Winners> =>
      import('../pages/winners/winners.ts').then((module) => new module.Winners()),
  },
];