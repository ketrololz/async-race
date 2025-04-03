import { CAR_WIDTH } from "../constants/app-settings";
import type { CarProps } from "../types/car-props";
import BaseComponent from "./base-component";

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
        const timeFraction = (performance.now() - start) / timeInMs;
        const progress = timeFraction;
        const currentWidth = window.innerWidth - CAR_WIDTH;
        const distance = (currentWidth * progress) - this.node.clientWidth

        if (distance > 0) {
          this.node.style.left = `${distance}px`;
        }

        if (progress < 1 && !this.animationStopped) {
          requestAnimationFrame(drive);
        }
      }

      requestAnimationFrame(drive);
    }

    public stopAnimation(): void {
      this.animationStopped = true;
    }

}