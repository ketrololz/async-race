import { Route } from '../types/route.ts';
import BaseComponent from '../utils/base-component.ts';

export default class Router {
  constructor(private routes: Route[], private outlet: BaseComponent<'div'>) {
    this.routes = routes;
    this.outlet = outlet;

    this.navigate(window.location.pathname);

    window.addEventListener('popstate', () =>
      this.navigate(window.location.pathname),
    );
  }

  public createPage(path: string): void {
    const route = this.routes.find((route) => route.path === path);
    if (route) {
      this.outlet.destroyChildren();
      route
        .page(this)
        .then((page) => this.outlet.appendChildren(page));
    }
  }

  public navigate(path: string): void {
    window.history.pushState(null, '', `${window.location.origin}${path}`);

    this.createPage(path);
  }
}