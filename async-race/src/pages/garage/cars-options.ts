import { ButtonComponent } from '../../components/button-component';
import { InputComponent } from '../../components/input-component';
import type { Props } from '../../types/props';
import BaseComponent from '../../utils/base-component';
import { CarsApiService } from './cars-api-service';

export class CarsOptions extends BaseComponent<'div'> {
  // private api = new CarsApiService();

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

    new InputComponent({
      parent: newCarContainer,
      placeholder: 'car name',
    });

    new InputComponent({
      parent: newCarContainer,
      onChange: (data): void => console.log(data),
      type: 'color',
    });

    new ButtonComponent({
      className: 'btn',
      text: 'add car',
      parent: newCarContainer,
      // onClick: (): Promise<void> => this.api.addCar({ name: 'test', color: '#ffffff'})
    });

    const updateCarContainer = new BaseComponent({
      className: 'options-container',
      parent: optionsContainer,
    });

    new InputComponent({
      parent: updateCarContainer,
      placeholder: 'car name',
    });

    new InputComponent({
      parent: updateCarContainer,
      onChange: (data): void => console.log(data),
      type: 'color',
    });

    new ButtonComponent({
      className: 'btn',
      text: 'update car',
      parent: updateCarContainer,
    });
  }
}
