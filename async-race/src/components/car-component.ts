import {
  ANIMATION_CORRECTION_DISTANCE,
  CAR_WIDTH,
} from '../constants/app-settings';
import type { CarProps } from '../types/car-props';
import type { HtmlTags } from '../types/html-tags';
import BaseComponent from './base-component';
import { FetchSvgComponent } from './FetchSvgComponent';

export class CarComponent extends BaseComponent<'div'> {
  private animationStopped = false;
  private animationId = 0;
  private timeInSeconds = 0;
  private container: BaseComponent<HtmlTags>;
  private backWheelSvg: FetchSvgComponent;
  private frontWheelSvg: FetchSvgComponent;

  constructor(
    props: CarProps<'div'>,
    frontWheel: FetchSvgComponent,
    backWheel: FetchSvgComponent,
    carSvg: FetchSvgComponent,
  ) {
    super({ tag: 'div', ...props });
    this.container = props.parent;
    this.node.style.color = props.color;

    this.backWheelSvg = backWheel;
    this.frontWheelSvg = frontWheel;

    this.appendChildren(frontWheel, backWheel, carSvg);
  }

  public animateCar(timeInMs: number): void {
    this.timeInSeconds = (Math.round(timeInMs / 10) * 10) / 1000;
    this.animationStopped = false;
    const start = performance.now();
    const currentWidth = this.container.node.offsetWidth;

    const drive = (): void => {
      if (this.animationStopped) {
        return;
      }

      let progress = (performance.now() - start) / timeInMs;
      const angle = 1480 * progress;

      if (progress > 1) {
        progress = 1;
      }

      const distance = currentWidth * progress;
      const percent = (distance / currentWidth) * 100;

      if (distance > CAR_WIDTH + ANIMATION_CORRECTION_DISTANCE) {
        this.node.style.left = `calc(${percent}% - ${CAR_WIDTH}px)`;
        this.frontWheelSvg.node.style.transform = `rotate(${angle}deg)`;
        this.backWheelSvg.node.style.transform = `rotate(${angle}deg)`;
      }

      if (progress < 1) {
        this.animationId = requestAnimationFrame(drive);
      }
    };

    requestAnimationFrame(drive);
  }

  public stopAnimation(): void {
    cancelAnimationFrame(this.animationId);
  }

  public returnToStartPosition(): void {
    this.stopAnimation();
    this.node.style.left = '0%';
  }

  public getTime(): number {
    return this.timeInSeconds;
  }
}
