import { ButtonComponent } from '../../components/button-component';
import { InputComponent } from '../../components/input-component';
import type { Car } from '../../types/car';
import type { Props } from '../../types/props';
import BaseComponent from '../../utils/base-component';
import { EventEmitter } from '../../utils/event-emitter';

export class CarsOptions extends BaseComponent<'div'> {
  public readonly add = new EventEmitter<Omit<Car, 'id'>>();
  public readonly update = new EventEmitter<Car>();
  private selected: Car | null = null;
  private nameInput: InputComponent = <InputComponent>{};

  constructor(props: Props<'div'> = {}) {
    super({ className: 'car-road', ...props });

    const optionsContainer = new BaseComponent({
      className: 'car-options-btns-container',
      parent: this,
    });

    const newCarContainer = new BaseComponent({
      className: 'options-container',
      parent: optionsContainer,
    });

    const name = new InputComponent({
      parent: newCarContainer,
      placeholder: 'car name',
    });

    const color = new InputComponent({
      parent: newCarContainer,
      onChange: (data): void => console.log(data),
      type: 'color',
    });

    new ButtonComponent({
      className: 'btn',
      text: 'add car',
      parent: newCarContainer,
      onClick: (): void =>
        this.add.emit({ name: name.value, color: color.value }),
    });

    const carUpdaterContainer = new BaseComponent({
      className: 'options-container',
      parent: optionsContainer,
    });

    const nameUpdater = new InputComponent({
      parent: carUpdaterContainer,
      placeholder: 'car name',
    });

    this.nameInput = nameUpdater;

    const colorUpdater = new InputComponent({
      parent: carUpdaterContainer,
      onChange: (data): void => console.log(data),
      type: 'color',
    });

    new ButtonComponent({
      className: 'btn',
      text: 'update car',
      parent: carUpdaterContainer,
      onClick: (): void => {
        if (this.selected) {
          this.update.emit({
            id: this.selected?.id,
            name: nameUpdater.value,
            color: colorUpdater.value,
          });
        }
      },
    });
  }

  public setSelected(car: Car): void {
    this.selected = car;
    this.nameInput.node.value = car.name;
  }
}
