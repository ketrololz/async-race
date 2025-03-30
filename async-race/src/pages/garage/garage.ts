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

    this.subscribe(options.add.subscribe((car) => this.carsFacade.create(car)));
    this.subscribe(
      options.update.subscribe((car) => this.carsFacade.update(car)),
    );

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

    this.carsFacade.get();

    this.subscribe(
      this.carsFacade.carList.subscribe((cars) => {
        this._cars.forEach((car) => car.destroyNode());

        cars.forEach((car) => {
          const carRoad = new CarRoad(car);
          carsContainer.appendChildren(carRoad);
          this.subscribe(
            carRoad.delete.subscribe(() => {
              this.carsFacade.remove(car);
            }),
          );

          this.subscribe(
            carRoad.select.subscribe(() => {
              options.setSelected(carRoad.getCar());
            }),
          );

          this._cars.push(carRoad);
        });
      }),
    );
  }

  // private nextPage(): void {}
}
