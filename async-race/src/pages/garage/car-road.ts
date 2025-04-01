import { ButtonComponent } from '../../components/button-component';
import type { Car } from '../../components/car';
import BaseComponent from '../../utils/base-component';
import { EventEmitter } from '../../utils/event-emitter';

export class CarRoad extends BaseComponent<'div'> {
  public delete = new EventEmitter<void>();
  public select = new EventEmitter<void>();

  constructor(private readonly car: Car) {
    super({ tag: 'div', className: 'car-road' });

    const carOptionsButtonsContainer = new BaseComponent({
      className: 'car-options-btns-container',
      parent: this,
    });

    new ButtonComponent({
      className: 'btn select-btn',
      parent: carOptionsButtonsContainer,
      text: 'select',
      onClick: (): void => this.select.emit(),
    });

    new ButtonComponent({
      className: 'btn remove-btn',
      parent: carOptionsButtonsContainer,
      text: 'remove',
      onClick: (): void => this.delete.emit(),
    });

    new BaseComponent({
      tag: 'h3',
      className: 'car-title',
      parent: carOptionsButtonsContainer,
      text: car.name,
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

    const car2 = new BaseComponent({
      className: 'car',
      parent: carContainer,
    });

    car2.node.style.backgroundColor = car.color;

    new BaseComponent({
      className: 'road',
      parent: roadContainer,
    });
  }

  public getCar(): Car {
    return this.car;
  }
}
