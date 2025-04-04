import { ButtonComponent } from '../../components/button-component';
import type { Props } from '../../types/props';
import BaseComponent from '../../components/base-component';
import { EventEmitter } from '../../utils/event-emitter';

export class RaceStarter extends BaseComponent<'div'> {
  public readonly race = new EventEmitter<void>();

  constructor(props: Props<'div'> = {}) {
    super({ className: 'car-creator', ...props });
    new ButtonComponent({
      className: 'btn',
      text: 'start race',
      parent: this,
      onClick: (): void => this.race.emit(),
    });
  }
}
