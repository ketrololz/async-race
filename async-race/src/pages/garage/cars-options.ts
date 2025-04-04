import type { Props } from '../../types/props';
import BaseComponent from '../../components/base-component';
import { CarCreator } from './car-creator';
import { CarUpdater } from './car-updater';
import { carsFacade } from '../../state/cars-facade';
import { CarsGenerator } from './cars-generator';
import { RaceStarter   } from './race-starter';

export class CarsOptions extends BaseComponent<'div'> {
  public readonly creator: CarCreator;
  public readonly updater: CarUpdater;
  public readonly generator: CarsGenerator;
  public readonly raceStarter: RaceStarter;
  private readonly carsFacade = carsFacade;

  constructor(props: Props<'div'> = {}) {
    super({ className: 'car-road', ...props });

    const optionsContainer = new BaseComponent({
      className: 'car-options-btns-container',
      parent: this,
    });

    this.creator = new CarCreator({ parent: optionsContainer });
    this.updater = new CarUpdater({ parent: optionsContainer });
    this.generator = new CarsGenerator({ parent: optionsContainer });
    this.raceStarter = new RaceStarter({ parent: optionsContainer });

    this.subscribe(
      this.creator.add.subscribe((car) => {
        this.carsFacade.create(car);
      }),
    );

    this.subscribe(
      this.updater.change.subscribe((car) => {
        this.carsFacade.update(car);
      }),
    );

    this.subscribe(
      this.generator.add.subscribe((car) => {
        this.carsFacade.create(car);
      }),
    );

    // this.subscribe(
    //   this.raceStarter.race.subscribe((road) => {
    //     this.carsFacade.startRace(road);
    //   }),
    // );
  }
}
