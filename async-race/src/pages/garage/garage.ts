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
  private title: BaseComponent<HtmlTags>;
  private subtitle: BaseComponent<HtmlTags>;

  constructor() {
    super();

    this.title = new BaseComponent({
      parent: this,
      text: `Garage(0)`,
    });

    this.subtitle = new BaseComponent({
      parent: this,
      text: `Page 1`,
    });

    const options = new CarsOptions({
      parent: this,
    });

    const carsContainer = new BaseComponent({
      parent: this,
    });

    new ButtonComponent({
      text: 'prev',
      parent: this,
      onClick: (): Promise<void> =>
        this.carsFacade.setPage(this.carsFacade.page - 1),
    });

    new ButtonComponent({
      text: 'next',
      parent: this,
      onClick: (): Promise<void> =>
        this.carsFacade.setPage(this.carsFacade.page + 1),
    });

    this.carsFacade.setPage(this.carsFacade.page);

    this.renderRoads(options, carsContainer);
  }

  private renderRoads(
    options: CarsOptions,
    parent: BaseComponent<HtmlTags>,
  ): void {
    this.subscribe(
      this.carsFacade.carList.subscribe((cars) => {
        this._cars.forEach((car) => car.destroyNode());
        this.title.text = `Garage(${this.carsFacade.totalCount})`;
        this.subtitle.text = `Page ${this.carsFacade.page} `;

        cars.forEach((car) => {
          const carRoad = new CarRoad(car);
          parent.appendChildren(carRoad);

          this.subscribeDeleteButtons(carRoad, options);
          this.subscribeSelectButtons(carRoad, options);
          this.subscribeStartButtons(carRoad);
          this.subscribeStopButtons(carRoad);

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

  private subscribeStartButtons(road: CarRoad): void {
    this.subscribe(
      road.start.subscribe(() => {
        this.carsFacade.startEngine(road.getCar());
      }),
    );
  }

  private subscribeStopButtons(road: CarRoad): void {
    this.subscribe(
      road.stop.subscribe(() => {
        this.carsFacade.stopEngine(road.getCar());
      }),
    );
  }

  // private nextPage(): void {}
}
