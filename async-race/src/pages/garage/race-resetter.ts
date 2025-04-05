import { ButtonComponent } from '../../components/button-component';
import { EventEmitter } from '../../utils/event-emitter';
import type { ButtonProps } from '../../types/button-props';

export class RaceResetter extends ButtonComponent {
  public readonly reset = new EventEmitter<void>();

  constructor(props: ButtonProps<'button'> = {}) {
      super({
        className: 'car-creator btn',
        text: 'reset race',
        onClick: () => this.reset.emit(),
        ...props,
      });
    }
}