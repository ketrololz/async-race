import type { Route } from '../types/route.ts';
import type BaseComponent from '../components/base-component.ts';

export default class Router {
  constructor(
    private routes: Route[],
    private outlet: BaseComponent<'div'>,
  ) {
    this.routes = routes;
    this.outlet = outlet;

    this.navigate(window.location.pathname);

    window.addEventListener('popstate', () =>
      this.navigate(window.location.pathname),
    );
  }

  public get allRoutes(): Route[] {
    return this.routes;
  }

  public createPage(path: string): void {
    const route = this.routes.find((route) => route.path === path);
    if (route) {
      this.outlet.destroyChildren();
      route.page(this).then((page) => this.outlet.appendChildren(page));
    }
  }

  public navigate(path: string): void {
    window.history.pushState(null, '', `${window.location.origin}${path}`);

    this.createPage(path);
  }
}
