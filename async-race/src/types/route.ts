import type Router from '../router/router';
import type BaseComponent from '../components/base-component';

export type Route<T extends BaseComponent<'div'> = BaseComponent<'div'>> = {
  name: string;
  path: string;
  page: (router: Router) => Promise<T>;
};
