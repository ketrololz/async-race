import BaseComponent from '../../components/base-component';
import type { Winner } from '../../types/winner';

export class CarWinner extends BaseComponent<'div'> {
  constructor(car: Winner, position: number) {
    super({ className: 'winner-line' });

    new BaseComponent({
      className: 'winner-line_number',
      text: position.toString(),
      parent: this,
    });

    new BaseComponent({
      className: 'winner-line_car',
      text: car.color,
      parent: this,
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
