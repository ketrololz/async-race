import { SVG_PATH } from '../constants/app-settings';
import type { Props } from '../types/props';
import BaseComponent from './base-component';
type cache = { [key: string]: string };

export class FetchSvgComponent extends BaseComponent<'div'> {
  private cache: cache = {};
  public svgText = '';

  constructor(name: string, props: Props<'div'> = {}) {
    super({ tag: 'div', ...props });
    this.render(name);
  }

  private async render(name: string): Promise<void> {
    if (this.cache[name]) {
      this.node.innerHTML = this.cache[name];
      return;
    }
    try {
      const svg = await fetch(`${SVG_PATH}/${name}.svg`);
      this.svgText = await svg.text();
      this.node.innerHTML = this.svgText;
    } catch {}
  }
}
