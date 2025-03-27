import { ButtonComponent } from "../../components/button-component";
import BaseComponent from "../../utils/base-component";

export class Garage extends BaseComponent<'div'> {
  constructor() {
    super({
      tag: 'div',
    })

    new ButtonComponent({text: 'garage', parent: this });
  }
}