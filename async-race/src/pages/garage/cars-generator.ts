import { ButtonComponent } from '../../components/button-component';
import { carModels } from '../../constants/cars';
import type { Car } from '../../components/car';
import { EventEmitter } from '../../utils/event-emitter';
import { RGB_COLORS } from '../../constants/rgb-colors';
import type { ButtonProps } from '../../types/button-props';
import { GENERATE_CARS_COUNT } from '../../constants/app-settings';

export class CarsGenerator extends ButtonComponent {
  public readonly add = new EventEmitter<Omit<Car, 'id'>>();

  constructor(props: ButtonProps<'button'> = {}) {
    super({
      className: 'car-generator btn',
      text: 'generate',
      ...props,
      onClick: () => this.generate(GENERATE_CARS_COUNT),
    });
  }

  private generate(count: number): void {
    for (let i = 0; i < count; i += 1) {
      const brandList = Object.keys(carModels);

      const brandsCount = brandList.length;
      const randomBrandNum = this.randomNumFromZero(brandsCount - 1);

      const brand = brandList[randomBrandNum];
      const modelsCount = carModels[brand].length;

      const randomModelNum = this.randomNumFromZero(modelsCount - 1);

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
    return `#${Math.floor(Math.random() * RGB_COLORS)
      .toString(16)
      .padStart(6, '0')}`;
  }
}
