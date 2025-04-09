import { SVG_PATH } from "../constants/app-settings";
import type { Props } from "../types/props";
import BaseComponent from "./base-component";

export class FetchSvgComponent extends BaseComponent<'div'> {
  public svgText = '';

  constructor(name: string, props: Props<'div'> = {}) {
    super({ tag: 'div', ...props });
    this.render(name);
  }

  private async render(name: string): Promise<void> {
    try{
      const svg = await fetch(`${SVG_PATH}/${name}.svg`);
      this.svgText = await svg.text();
      this.node.innerHTML = this.svgText;
    } catch {}
  }
}