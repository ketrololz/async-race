import Router from './router/router';
import { ROUTES } from './router/routes';
import BaseComponent from './components/base-component';
import './styles/style.scss';
import { Header } from './header/header';

export class App extends BaseComponent<'div'> {
  private readonly body = document.body;

  constructor() {
    super({ tag: 'div', className: 'app' });
    this.body.appendChild(this.node);
    const outlet = new BaseComponent({ tag: 'div', className: 'outlet' });
    const router = new Router(ROUTES, outlet);

    new Header(router, { parent: this });
    this.appendChildren(outlet);
  }
}
