import { ButtonComponent } from '../../components/button-component';
import type { Props } from '../../types/props';
import BaseComponent from '../../utils/base-component';

export class CarRoad extends BaseComponent<'div'> {
  constructor(props: Props<'div'> = {}) {
    super({ tag: 'div', className: 'car-road', ...props });

    const carOptionsButtonsContainer = new BaseComponent({
      tag: 'div',
      className: 'car-options-btns-container',
      parent: this,
    });

    new ButtonComponent({
      className: 'btn select-btn',
      parent: carOptionsButtonsContainer,
      text: 'select',
      onClick: (): void => console.log('select'),
    });

    new ButtonComponent({
      className: 'btn remove-btn',
      parent: carOptionsButtonsContainer,
      text: 'remove',
      onClick: (): void => console.log('remove'),
    });

    new BaseComponent({
      tag: 'h3',
      className: 'car-title',
      parent: carOptionsButtonsContainer,
      text: 'car name',
    });

    const carControllerButtonsContainer = new BaseComponent({
      tag: 'div',
      className: 'car-controller-btns-container',
      parent: this,
    });

    new ButtonComponent({
      className: 'btn start-drive-btn',
      parent: carControllerButtonsContainer,
      text: 'start',
      onClick: (): void => console.log('start'),
    });

    new ButtonComponent({
      className: 'btn stop-drive-btn',
      parent: carControllerButtonsContainer,
      text: 'stop',
      onClick: (): void => console.log('stop'),
    });

    const roadContainer = new BaseComponent({
      tag: 'div',
      className: 'road-container',
      parent: this,
    });

    const carContainer = new BaseComponent({
      tag: 'div',
      className: 'car-container',
      parent: roadContainer,
    });

    new BaseComponent({
      tag: 'div',
      className: 'car',
      parent: carContainer,
    });

    new BaseComponent({
      tag: 'div',
      className: 'road',
      parent: roadContainer,
    });
  }
}
