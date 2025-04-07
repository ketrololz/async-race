import type { CarRoad } from '../pages/garage/car-road';
import type { Winner } from '../types/winner';
import { carsFacade } from './cars-facade';
import { winnersFacade } from './winners-facade';

class RaceFacade {
  private carsFacade = carsFacade;
  private winnersFacade = winnersFacade;

  public async startRace(roads: CarRoad[]): Promise<Winner | undefined> {
    try {
      const promises = roads.map(async (road) => {
        const time = await this.carsFacade.startEngine(road.getCar());
        road.getCarElement().animateCar(time);
        const status = await this.carsFacade.drive(road.getCar());
        
        if (status === 500) {
          road.getCarElement().stopAnimation();
          throw new Error('Stopped');
        }

        if (status === 200) {
          const seconds = (Math.round(time / 10) * 10) / 1000
          await this.winnersFacade.add({
            time: seconds.toString(),
            wins: '0',
            ...road.getCar(),
          });
          return road;
        }

        throw new Error('No winners');
      });

      const car = await Promise.any(promises);
      const winner = await this.winnersFacade.getById(car.getCar().id);
      return winner;
    } catch (e) {
      console.warn(e);
    }
  }

  public async stopRace(roads: CarRoad[]): Promise<void> {
    try {
      const promises = roads.map(async (road) => {
        await this.carsFacade.stopEngine(road.getCar());
        road.getCarElement().returnToStartPosition();
      });

      await Promise.allSettled(promises);
    } catch (e) {
      console.warn(e);
    }
  }
}

export const raceFacade = new RaceFacade();
