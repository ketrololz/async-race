import {
  ANIMATION_CORRECTION_DISTANCE,
  CAR_WIDTH,
} from '../constants/app-settings';
import type { CarProps } from '../types/car-props';
import type { HtmlTags } from '../types/html-tags';
import BaseComponent from './base-component';

export class CarComponent extends BaseComponent<'div'> {
  private animationStopped = false;
  private timeInSeconds = 0;
  private container: BaseComponent<HtmlTags>;

  constructor(props: CarProps<'div'>) {
    super({ tag: 'div', ...props });
    this.container = props.parent;
    this.node.style.backgroundColor = props.color;
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

      if (progress > 1) {
        progress = 1;
      }

      const distance = currentWidth * progress;
      const percent = (distance / currentWidth) * 100;

      if (distance > CAR_WIDTH + ANIMATION_CORRECTION_DISTANCE) {
        this.node.style.left = `calc(${percent}% - ${CAR_WIDTH}px)`;
      }

      if (progress < 1) {
        requestAnimationFrame(drive);
      }
    };

    requestAnimationFrame(drive);
  }

  public stopAnimation(): void {
    this.animationStopped = true;
  }

  public returnToStartPosition(): void {
    this.stopAnimation();
    this.node.style.left = '0%';
  }

  public getTime(): number {
    return this.timeInSeconds;
  }
}
