import { ButtonComponent } from '../../components/button-component';
import { carModels } from '../../constants/cars';
import type { Car } from '../../types/car';
import type { Props } from '../../types/props';
import BaseComponent from '../../utils/base-component';
import { EventEmitter } from '../../utils/event-emitter';

export class CarsGenerator extends BaseComponent<'div'> {
  public readonly add = new EventEmitter<Omit<Car, 'id'>>();
  private generatorButton = <ButtonComponent>{};

  constructor(props: Props<'div'> = {}) {
    super({ className: 'car-creator', ...props });
    this.generatorButton = new ButtonComponent({
      className: 'btn',
      text: 'generate',
      parent: this,
      onClick: (): void => this.generate(3),
    });
  }

  private generate(count: number): void {
    for (let i = 0; i < count; i += 1) {
      const brandList = Object.keys(carModels);

      const brandsCount = brandList.length;
      const randomBrandNum = this.randomNumFromZero(brandsCount);

      const modelsCount = brandList[randomBrandNum].length;
      const randomModelNum = this.randomNumFromZero(modelsCount);

      const brand = brandList[randomBrandNum];
      const modelList = carModels[brand];

      const model = modelList[randomModelNum];

      this.create({ name: `${brand} ${model}`, color: this.randomColor() });
    }
  }

  private create(car: Omit<Car, 'id'>): void {
    this.add.emit(car);
  }

  private randomNumFromZero(max: number): number {
    return Math.floor(Math.random() * (max + 1));
  }

  private randomColor(): string {
    return `#${Math.floor(Math.random() * (256 * 256 * 256))
      .toString(16)
      .padStart(6, '0')}`;
  }
}
