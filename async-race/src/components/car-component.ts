import {
  ANIMATION_CORRECTION_DISTANCE,
  CAR_WIDTH,
} from '../constants/app-settings';
import type { CarProps } from '../types/car-props';
import BaseComponent from './base-component';

export class CarComponent extends BaseComponent<'div'> {
  private animationStopped = false;
  constructor(props: CarProps<'div'>) {
    super({ tag: 'div', ...props });

    this.node.style.backgroundColor = props.color;
  }

  public animateCar(timeInMs: number): void {
    // const seconds = (Math.round(timeInMs / 10) * 10) / 1000;
    this.animationStopped = false;
    const start = performance.now();

    const drive = (): void => {
      const progress = (performance.now() - start) / timeInMs;
      const currentWidth = window.innerWidth;
      const distance = currentWidth * progress;
      const percent = (distance / currentWidth) * 100;

      if (distance > CAR_WIDTH + ANIMATION_CORRECTION_DISTANCE) {
        this.node.style.left = `calc(${percent}% - ${CAR_WIDTH}px)`;
      }

      if (progress < 1 && !this.animationStopped) {
        requestAnimationFrame(drive);
      }
    };

    requestAnimationFrame(drive);
  }

  public stopAnimation(): void {
    this.animationStopped = true;
  }
}
