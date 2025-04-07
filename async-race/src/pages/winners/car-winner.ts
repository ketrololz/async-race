import BaseComponent from '../../components/base-component';
import { WinnerCarComponent } from '../../components/winner-car-component';
import type { Winner } from '../../types/winner';

export class CarWinner extends BaseComponent<'div'> {
  constructor(car: Winner, position: number) {
    super({ className: 'winner-line' });

    new BaseComponent({
      className: 'winner-line_number',
      text: position.toString(),
      parent: this,
    });

    new WinnerCarComponent({
      className: 'winner-line_car',
      parent: this,
      color: car.color,
    });

    new BaseComponent({
      className: 'winner-line_name',
      text: car.name,
      parent: this,
    });

    new BaseComponent({
      className: 'winner-line_number',
      text: car.wins,
      parent: this,
    });

    new BaseComponent({
      className: 'winner-line_number',
      text: car.time,
      parent: this,
    });
  }
}
