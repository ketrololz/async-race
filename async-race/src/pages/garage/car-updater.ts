import { ButtonComponent } from '../../components/button-component';
import { InputComponent } from '../../components/input-component';
import { DEFAULT_COLOR } from '../../constants/app-settings';
import type { Car } from '../../components/car';
import type { Props } from '../../types/props';
import BaseComponent from '../../components/base-component';
import { EventEmitter } from '../../utils/event-emitter';

export class CarUpdater extends BaseComponent<'div'> {
  public readonly change = new EventEmitter<Car>();
  private selected: Car | null = null;
  private updaterButton: ButtonComponent;
  private name: InputComponent;
  private color: InputComponent;

  constructor(props: Props<'div'> = {}) {
    super({ className: 'car-updater', ...props });

    this.name = new InputComponent({
      parent: this,
      placeholder: 'new car name',
      onChange: (): void => {
        return this.name.value
          ? this.updaterButton.enable()
          : this.updaterButton.disable();
      },
    });

    this.color = new InputComponent({
      parent: this,
      type: 'color',
      value: DEFAULT_COLOR,
    });

    this.updaterButton = new ButtonComponent({
      className: 'btn',
      text: 'update car',
      parent: this,
      onClick: (): void => {
        if (this.selected) {
          this.update({
            id: this.selected?.id,
            name: this.name.value,
            color: this.color.value,
          });
        }
      },
    });

    this.updaterButton.disable();
  }

  public setSelected(car: Car): void {
    this.selected = car;
    this.name.value = car.name;
    this.color.value = car.color;
    this.updaterButton.enable();
  }

  public removeSelected(): void {
    this.selected = null;
    this.updaterButton.disable();
    this.name.value = '';
    this.color.value = DEFAULT_COLOR;
  }

  private update(car: Car): void {
    this.change.emit(car);
    this.removeSelected();
  }
}
