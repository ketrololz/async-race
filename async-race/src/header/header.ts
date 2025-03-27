import { ButtonComponent } from '../components/button-component';
import Router from '../router/router';
import { Props } from '../types/props';
import BaseComponent from '../utils/base-component';

export class Header extends BaseComponent<'div'> {
  constructor(router: Router, props: Props<'div'>) {
    super({ tag: props.tag, ...props });

    const navButtons: ButtonComponent[] = [];
    const routes = router.allRoutes;
    routes.forEach((route) => {
      const btn = new ButtonComponent({
        text: route.name,
        onClick: () => {
          console.log(route.name, route.path);
          router.navigate(route.path);
        },
        className: 'nav-btn',
      });

      navButtons.push(btn);
    });

    this.appendChildren(...navButtons);
  }
}
