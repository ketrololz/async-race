import { ButtonComponent } from '../../components/button-component';
import BaseComponent from '../../utils/base-component';
import { CarRoad } from './car-road';
import '../garage/garage.scss';
import { CarsOptions } from './cars-options';
import { carsFacade } from '../../state/cars-facade';
import type { HtmlTags } from '../../types/html-tags';

export class Garage extends BaseComponent<'div'> {
  private readonly carsFacade = carsFacade;
  private readonly _cars: CarRoad[] = [];

  constructor() {
    super();

    const options = new CarsOptions({
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

    this.carsFacade.get();

    console.log(this)

    this.renderRoads(options, carsContainer);
  }

  private renderRoads(options: CarsOptions, parent: BaseComponent<HtmlTags>): void {
    this.subscribe(
      this.carsFacade.carList.subscribe((cars) => {
        this._cars.forEach((car) => car.destroyNode());

        cars.forEach((car) => {
          const carRoad = new CarRoad(car);
          parent.appendChildren(carRoad);

          this.subscribeDeleteButtons(carRoad, options);
          this.subscribeSelectButtons(carRoad, options);

          this._cars.push(carRoad);
        });
      }),
    );
  }

  private subscribeDeleteButtons(road: CarRoad, options: CarsOptions): void {
    this.subscribe(
      road.delete.subscribe(() => {
        this.carsFacade.remove(road.getCar());
        options.updater.removeSelected();
      }),
    );
  }

  private subscribeSelectButtons(road: CarRoad, options: CarsOptions): void {
    this.subscribe(
      road.select.subscribe(() => {
        options.updater.setSelected(road.getCar());
      }),
    );
  }

  // private nextPage(): void {}
}
