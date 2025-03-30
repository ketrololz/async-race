import type { InputProps } from "../types/input-props";
import BaseComponent from "../utils/base-component";

export class InputComponent extends BaseComponent<'input'> {
  constructor(props: InputProps<'input'> = {}) {
    super({ tag: 'input', ...props })

    if (props.onChange) {
      this.addListener('input', (e) => {
        if (e.target instanceof HTMLInputElement) {
          console.log(e.target.value)
        }
      });
    }

    if (props.type) {
      this.setAttribute('type', props.type);
    }

    if (props.value) {
      this.setAttribute('value', props.value);
    }

    if (props.placeholder) {
      this.setAttribute('placeholder', props.placeholder );
    }
  }

  public get value(): string {
    return this.node.value;
  }
}