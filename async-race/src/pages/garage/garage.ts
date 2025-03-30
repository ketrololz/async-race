import { ButtonComponent } from '../../components/button-component';
import BaseComponent from '../../utils/base-component';
import { CarRoad } from './car-road';
import '../garage/garage.scss';
import { CarsOptions } from './cars-options';
import { CarsFacade } from '../../state/cars-facade';

export class Garage extends BaseComponent<'div'> {
  private readonly carsFacade = new CarsFacade();
  private readonly _cars: CarRoad[] = [];

  constructor() {
    super();

    const options = new CarsOptions({
      parent: this,
    });

    this.sub(options.add.subscribe((car) => this.carsFacade.createCar(car)));

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

    this.carsFacade.getCars();

    this.sub(
      this.carsFacade.cars.subscribe((cars) => {
        this._cars.forEach((car) => car.destroyNode());

        cars.forEach((car) => {
          const carRoad = new CarRoad({
            parent: carsContainer,
            text: car.name,
          });

          this.sub(
            carRoad.delete.subscribe(() => {
              this.carsFacade.removeCar(car);
            }),
          );

          this._cars.push(carRoad);
        });
      }),
    );
  }

  // private nextPage(): void {}
}
