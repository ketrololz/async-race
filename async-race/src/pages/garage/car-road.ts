import { ButtonComponent } from '../../components/button-component';
import type { Props } from '../../types/props';
import BaseComponent from '../../utils/base-component';
import { EventEmitter } from '../../utils/event-emitter';

export class CarRoad extends BaseComponent<'div'> {
  public delete = new EventEmitter<void>(); 

  constructor(props: Props<'div'> = {}) {
    super({ tag: 'div', className: 'car-road', ...props });

    const carOptionsButtonsContainer = new BaseComponent({
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
      onClick: (): void => {
        this.delete.emit();
      },
    });

    new BaseComponent({
      tag: 'h3',
      className: 'car-title',
      parent: carOptionsButtonsContainer,
      text: 'car name',
    });

    const carControllerButtonsContainer = new BaseComponent({
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
      className: 'road-container',
      parent: this,
    });

    const carContainer = new BaseComponent({
      className: 'car-container',
      parent: roadContainer,
    });

    new BaseComponent({
      className: 'car',
      parent: carContainer,
    });

    new BaseComponent({
      className: 'road',
      parent: roadContainer,
    });
  }
}
