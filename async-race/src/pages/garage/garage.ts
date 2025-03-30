import { ButtonComponent } from '../../components/button-component';
import BaseComponent from '../../utils/base-component';
import { CarRoad } from './car-road';
import '../garage/garage.scss';
import { CarsOptions } from './cars-options';
import { CarsState } from '../../state/cars-state';

export class Garage extends BaseComponent<'div'> {
  private carsState = new CarsState();

  constructor() {
    super();

    new CarsOptions({
      parent: this,
    });

    const carsContainer = new BaseComponent({
      parent: this,
    });

    new ButtonComponent({
      text: 'prev',
      parent: this,
      // onClick: (): void => console.log(this.carsState.getCarStateById(1)),
    });

    new ButtonComponent({
      text: 'next',
      parent: this,
      // onClick: (): void => console.log(this.carsState.getCarStateById(2)),
    });

    this.carsState.getCars();

    this.sub(
      this.carsState.cars.subscribe((cars) => {
        cars.forEach((car) => {
          console.log(car);
          new CarRoad({ parent: carsContainer, text: car.name });
        });
      }),
    );
  }

  // private nextPage(): void {}
}
