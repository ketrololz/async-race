import { ButtonComponent } from '../../components/button-component';
import type { Car } from '../../types/car';
import BaseComponent from '../../utils/base-component';
import { CarRoad } from './car-road';
import { carsController } from './cars-controller';
import '../garage/garage.scss';
import { CarsOptions } from './cars-options';

export class Garage extends BaseComponent<'div'> {
  constructor() {
    super();

    new CarsOptions({
      parent: this,
    });

    new ButtonComponent({
      text: 'garage',
      parent: this,
      onClick: (): Promise<Car | undefined> => carsController.getCarById(0),
    });
    
    new CarRoad({ parent: this });
  }
}
