import type { ButtonProps } from "../types/button-props";
import BaseComponent from "../utils/base-component";

export class ButtonComponent extends BaseComponent<'button'> {
  constructor(props: ButtonProps<'button'> = {}) {
    super({ tag: 'button', ...props })

    if (props.onClick) {
      this.addListener('click', props.onClick);
    }
  }
}