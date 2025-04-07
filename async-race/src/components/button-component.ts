import type { ButtonProps } from '../types/button-props';
import BaseComponent from './base-component';

export class ButtonComponent extends BaseComponent<'button'> {
  constructor(props: ButtonProps<'button'> = {}) {
    super({ tag: 'button', ...props });

    if (props.onClick) {
      this.addListener('click', props.onClick);
    }
  }

  public disable(): void {
    console.log('test')
    this.node.disabled = true;
  }

  public enable(): void {
    this.node.disabled = false;
  }
}
