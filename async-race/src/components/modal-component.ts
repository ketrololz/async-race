import type { Props } from '../types/props';
import BaseComponent from './base-component';

export class ModalComponent extends BaseComponent<'dialog'> {
  constructor(props: Props<'dialog'> = {}) {
    super({ tag: 'dialog', ...props });

    this.addListener('click', () => this.hide());
  }

  public show(text: string): void {
    this.text = text;
    this.node.showModal();
  }

  public hide(): void {
    this.destroyNode();
  }
}
