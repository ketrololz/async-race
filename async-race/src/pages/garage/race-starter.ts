import { ButtonComponent } from '../../components/button-component';
import { EventEmitter } from '../../utils/event-emitter';
import type { ButtonProps } from '../../types/button-props';

export class RaceStarter extends ButtonComponent {
  public readonly race = new EventEmitter<void>();

  constructor(props: ButtonProps<'button'> = {}) {
    super({
      className: 'car-creator btn',
      text: 'start race',
      onClick: (): void => this.race.emit(),
      ...props,
    });
  }
}
