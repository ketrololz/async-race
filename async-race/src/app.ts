import Router from "./router/router";
import { ROUTES } from "./router/routes";
import BaseComponent from "./utils/base-component";
import './styles/style.scss';
import { Header } from "./header/header";

export class App extends BaseComponent<'div'> {
  private readonly body = document.body;

  constructor() {
    super({ tag: 'div', className: 'app' });
    this.body.appendChild(this.node);
    const router = new Router(ROUTES, this);

    new Header(router, { parent: this } ) ;
  }
}