import { ButtonComponent } from '../components/button-component';
import type Router from '../router/router';
import type { Props } from '../types/props';
import BaseComponent from '../components/base-component';
import './header.scss';

export class Header extends BaseComponent<'div'> {
  constructor(router: Router, props: Props<'div'>) {
    super({ tag: props.tag, className: 'header', ...props });

    new BaseComponent({
      parent: this,
      className: 'h1',
      text: 'Hell Racers',
    })

    const buttonsContainer = new BaseComponent({
      parent: this,
      className: 'header-buttons-container',
    });

    const navButtons: ButtonComponent[] = [];
    const routes = router.allRoutes;
    routes.forEach((route) => {
      const btn = new ButtonComponent({
        text: route.name,
        onClick: (): void => {
          router.navigate(route.path);
        },
        className: 'nav-btn btn',
      });

      navButtons.push(btn);
    });

    buttonsContainer.appendChildren(...navButtons);
  }
}
