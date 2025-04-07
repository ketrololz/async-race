import { ButtonComponent } from '../../components/button-component';
import BaseComponent from '../../components/base-component';
import { CarRoad } from './car-road';
import '../garage/garage.scss';
import { CarsOptions } from './cars-options';
import { carsFacade } from '../../state/cars-facade';
import type { HtmlTags } from '../../types/html-tags';
import { ModalComponent } from '../../components/modal-component';
import { winnersFacade } from '../../state/winners-facade';

export class Garage extends BaseComponent<'div'> {
  private readonly carsFacade = carsFacade;
  private readonly winnersFacade = winnersFacade;
  private _cars: CarRoad[] = [];
  private title: BaseComponent<HtmlTags>;
  private subtitle: BaseComponent<HtmlTags>;
  private hasWinner = false;

  constructor() {
    super({ className: 'garage' });

    this.title = new BaseComponent({
      tag: 'h2',
      parent: this,
      text: `Garage(0)`,
    });

    this.subtitle = new BaseComponent({
      tag: 'h3',
      parent: this,
      text: `Page 1`,
    });

    const options = new CarsOptions({
      parent: this,
    });

    const carsContainer = new BaseComponent({
      parent: this,
      className: 'road-container',
    });

    const pageButtonsContainer = new BaseComponent({
      parent: this,
      className: 'page-btns-container',
    });

    new ButtonComponent({
      className: 'btn',
      text: 'prev',
      parent: pageButtonsContainer,
      onClick: (): Promise<void> =>
        this.carsFacade.setPage(this.carsFacade.page - 1),
    });

    new ButtonComponent({
      className: 'btn',
      text: 'next',
      parent: pageButtonsContainer,
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
        this._cars.forEach((car) => {
          car.destroyNode();
        });
        this._cars = [];
        this.title.text = `Garage(${this.carsFacade.totalCount})`;
        this.subtitle.text = `Page ${this.carsFacade.page}`;

        cars.forEach((car) => {
          const carRoad = new CarRoad(car);
          parent.appendChildren(carRoad);

          this.subscribeDeleteButtons(carRoad, options);
          this.subscribeSelectButtons(carRoad, options);
          this.subscribeStartButtons(carRoad);
          this.subscribeStopButtons(carRoad);
          this.subscribeRaceButton(carRoad, options);
          this.subscribeResetButton(carRoad, options);

          this._cars.push(carRoad);
        });
      }),
    );
  }

  private subscribeDeleteButtons(road: CarRoad, options: CarsOptions): void {
    road.subscribe(
      road.delete.subscribe(() => {
        this.carsFacade.remove(road.getCar());
        this.winnersFacade.delete(road.getCar().id);
        options.updater.removeSelected();
      }),
    );
  }

  private subscribeSelectButtons(road: CarRoad, options: CarsOptions): void {
    road.subscribe(
      road.select.subscribe(() => {
        options.updater.setSelected(road.getCar());
      }),
    );
  }

  private subscribeStartButtons(road: CarRoad): void {
    road.subscribe(
      road.start.subscribe(async () => {
        try {
          const time = await this.carsFacade.startEngine(road.getCar());
          road.getCarElement().animateCar(time);
          const status = await this.carsFacade.drive(road.getCar());
          if (status === 500) {
            road.getCarElement().stopAnimation();
          }
        } catch (e) {
          console.log(e);
        }
      }),
    );
  }

  private subscribeStopButtons(road: CarRoad): void {
    road.subscribe(
      road.stop.subscribe(async () => {
        await this.carsFacade.stopEngine(road.getCar());
        road.getCarElement().returnToStartPosition();
      }),
    );
  }

  private subscribeRaceButton(road: CarRoad, options: CarsOptions): void {
    road.subscribe(
      options.raceStarter.race.subscribe(async () => {
        this.hasWinner = false;
        const result = await this.carsFacade.startRace(road);

        if (result && !this.hasWinner) {
          const text = `${road.getCarElement().getTime()}, ${road.getCar().name}`;
          const modal = new ModalComponent({
            parent: this,
            className: 'modal-winner',
          });
          modal.show(text);

          const car = await this.winnersFacade.getById(road.getCar().id);

          if (car) {
            const bestTime =
              Number(car.time) > road.getCarElement().getTime()
                ? car.time
                : road.getCarElement().getTime().toString();
            this.winnersFacade.update({
              wins: String(Number(car.wins) + 1),
              time: bestTime,
              ...road.getCar(),
            });
          }

          this.winnersFacade.add({
            wins: '1',
            time: road.getCarElement().getTime().toString(),
            ...road.getCar(),
          });
          this.hasWinner = true;
        }
      }),
    );
  }

  private subscribeResetButton(road: CarRoad, options: CarsOptions): void {
    road.subscribe(
      options.raceResetter.reset.subscribe(async () => {
        this.carsFacade.stopRace(road);
      }),
    );
  }
}
