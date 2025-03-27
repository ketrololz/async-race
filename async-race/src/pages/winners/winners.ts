import { ButtonComponent } from '../../components/button-component';
import BaseComponent from '../../utils/base-component';

export class Winners extends BaseComponent<'div'> {
  constructor() {
    super({
      tag: 'div',
    });

    new ButtonComponent({ text: 'winners', parent: this });
  }
}
