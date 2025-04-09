import { ButtonComponent } from '../../components/button-component';
import type { Car } from '../../types/car';
import BaseComponent from '../../components/base-component';
import { EventEmitter } from '../../utils/event-emitter';
import { CarComponent } from '../../components/car-component';
import { FetchSvgComponent } from '../../components/FetchSvgComponent';

export class CarRoad extends BaseComponent<'div'> {
  public delete = new EventEmitter<void>();
  public select = new EventEmitter<void>();
  public start = new EventEmitter<void>();
  public stop = new EventEmitter<void>();
  public startButton: ButtonComponent;
  public deleteButton: ButtonComponent;
  public selectButton: ButtonComponent;
  public stopButton: ButtonComponent;
  private carElement: CarComponent;

  constructor(private readonly car: Car) {
    super({ tag: 'div', className: 'car-road' });

    const frontWheelSvg = new FetchSvgComponent('wheel', { className: 'front-wheel'});
    const backWheelSvg = new FetchSvgComponent('wheel', { className: 'back-wheel'});
    const carSvg = new FetchSvgComponent('car2', { className: 'car-image'});

    const roadContainer = new BaseComponent({
      className: 'road',
      parent: this,
    });

    const carControllerButtonsContainer = new BaseComponent({
      className: 'car-controller-btns-container',
      parent: roadContainer,
    });

    this.startButton = new ButtonComponent({
      className: 'btn start-drive-btn',
      parent: carControllerButtonsContainer,
      text: 'start',
      onClick: (): void => this.start.emit(),
    });

    this.stopButton = new ButtonComponent({
      className: 'btn stop-drive-btn',
      parent: carControllerButtonsContainer,
      text: 'stop',
      onClick: (): void => this.stop.emit(),
    });

    const carContainer = new BaseComponent({
      className: 'car-container',
      parent: roadContainer,
    });

    this.carElement = new CarComponent({
      className: 'car',
      parent: carContainer,
      color: car.color,
    }, frontWheelSvg, backWheelSvg, carSvg);

    const carOptionsButtonsContainer = new BaseComponent({
      className: 'car-selector-btns-container',
      parent: this,
    });

    this.selectButton = new ButtonComponent({
      className: 'btn select-btn',
      parent: carOptionsButtonsContainer,
      text: 'select',
      onClick: (): void => this.select.emit(),
    });

    this.deleteButton = new ButtonComponent({
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
  }

  public getCar(): Car {
    return this.car;
  }

  public getCarElement(): CarComponent {
    return this.carElement;
  }
}
