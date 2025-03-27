import { Garage } from '../pages/garage/garage.ts';
import { Winners } from '../pages/winners/winners.ts';

export const ROUTES = [
  {
    path: '/',
    page: (): Promise<Garage> =>
      import('../pages/garage/garage.ts').then(
        (module) => new module.Garage(),
      ),
  },
  {
    path: '/wheel',
    page: (): Promise<Winners> =>
      import('../pages/winners/winners.ts').then((module) => new module.Winners()),
  },
];