import type { Props } from '../../types/props';
import BaseComponent from '../../components/base-component';
import { CarCreator } from './car-creator';
import { CarUpdater } from './car-updater';
import { carsFacade } from '../../state/cars-facade';
import { CarsGenerator } from './cars-generator';
import { RaceStarter   } from './race-starter';
import { RaceResetter } from './race-resetter';

export class CarsOptions extends BaseComponent<'div'> {
  public readonly creator: CarCreator;
  public readonly updater: CarUpdater;
  public readonly generator: CarsGenerator;
  public readonly raceStarter: RaceStarter;
  public readonly raceResetter: RaceResetter;
  private readonly carsFacade = carsFacade;

  constructor(props: Props<'div'> = {}) {
    super({ className: 'car-options', ...props });

    const optionsContainer = new BaseComponent({
      className: 'car-options-container',
      parent: this,
    });

    const optionsButtonsContainer = new BaseComponent({
      className: 'car-options-btns-container',
      parent: this,
    });

    this.creator = new CarCreator({ parent: optionsContainer });
    this.updater = new CarUpdater({ parent: optionsContainer });
    this.generator = new CarsGenerator({ parent: optionsButtonsContainer });
    this.raceStarter = new RaceStarter({ parent: optionsButtonsContainer });
    this.raceResetter = new RaceResetter({ parent: optionsButtonsContainer});

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
  }
}
