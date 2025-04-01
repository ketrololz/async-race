import { ButtonComponent } from '../../components/button-component';
import { InputComponent } from '../../components/input-component';
import { DEFAULT_COLOR } from '../../constants/app-settings';
import type { Car } from '../../types/car';
import type { Props } from '../../types/props';
import BaseComponent from '../../utils/base-component';
import { EventEmitter } from '../../utils/event-emitter';

export class CarCreator extends BaseComponent<'div'> {
  public readonly add = new EventEmitter<Omit<Car, 'id'>>();
  private creatorButton: ButtonComponent;
  private name: InputComponent;
  private color: InputComponent;

  constructor(props: Props<'div'> = {}) {
    super({ className: 'car-creator', ...props });

    this.name = new InputComponent({
      parent: this,
      placeholder: 'car name',
      onChange: (): void => {
        return this.name.value
          ? this.creatorButton.enable()
          : this.creatorButton.disable();
      },
    });

    this.color = new InputComponent({
      parent: this,
      type: 'color',
      value: DEFAULT_COLOR,
    });

    this.creatorButton = new ButtonComponent({
      className: 'btn',
      text: 'add car',
      parent: this,
      onClick: (): void =>
        this.create({ name: this.name.value, color: this.color.value }),
    });

    this.creatorButton.disable();
  }

  protected create(car: Omit<Car, 'id'>): void {
    this.add.emit(car);
    this.name.value = '';
    this.color.value = DEFAULT_COLOR;
    this.creatorButton.disable();
  }
}
