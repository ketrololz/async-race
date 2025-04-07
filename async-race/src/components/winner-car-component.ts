import type { CarProps } from '../types/car-props';
import BaseComponent from './base-component';
import { FetchSvgComponent } from './FetchSvgComponent';

export class WinnerCarComponent extends BaseComponent<'div'> {

  constructor(props: CarProps<'div'>) {
    super({ tag: 'div', ...props });
    this.node.style.color = props.color;

    new FetchSvgComponent('car', { className: 'winner-car-image', parent: this });
  }
}