import { Observable } from '../utils/observable';
import { CarsApiService } from '../services/cars-api-service';
import type { Car } from '../types/car';
import { CARS_PER_PAGE } from '../constants/app-settings';
import { EngineApiService } from '../services/engine-api-service';
import type { CarRoad } from '../pages/garage/car-road';

class CarsFacade {
  public carList = new Observable<Car[]>([]);
  private carsApiService = new CarsApiService();
  private engineApiService = new EngineApiService();
  private _page = 1;

  public get totalCount(): string {
    return this.carsApiService.totalCars;
  }

  public get page(): number {
    return this._page;
  }

  public async getById(id: number): Promise<Car> {
    const car = await this.carsApiService.getCar(id);
    return car;
  }

  public async remove(car: Car): Promise<void> {
    try {
      await this.carsApiService.remove(car);
      this.carList.update((cars) => cars.filter((elem) => elem.id !== car.id));

      if (this.carList.value.length < 1 && this._page !== 1) {
        this._page -= 1;
      }

      this.setPage(this._page);
    } catch (e) {
      console.warn(e);
    }
  }

  public async create(params: { name: string; color: string }): Promise<void> {
    await this.carsApiService.add(params);
    this.setPage(this._page);
  }

  public async update(car: Car): Promise<void> {
    try {
      await this.carsApiService.update(car);
      this.carList.update((cars) =>
        cars.map((elem) => {
          if (car.id === elem.id) {
            elem = car;
          }
          return elem;
        }),
      );
    } catch (e) {
      console.warn(e);
    }
  }

  public async setPage(page: number = 1): Promise<void> {
    const totalPages = Math.ceil(Number(this.totalCount) / CARS_PER_PAGE) || 1;
    if (page > 0 && page <= totalPages) {
      const cars = await this.carsApiService.getPage(page);
      this._page = page;
      this.carList.set(cars);
    }
  }

  public async startEngine(car: Car): Promise<number> {
    const response = await this.engineApiService.start(car.id);
    const time = response.distance / response.velocity;
    return time;
  }

  public async stopEngine(car: Car): Promise<void> {
    await this.engineApiService.stop(car.id);
  }

  public async drive(car: Car): Promise<number> {
    return this.engineApiService.drive(car.id);
  }

  // public async startRace(road: CarRoad): Promise<void | CarRoad> {
  //   const time = await this.startEngine(road.getCar());
  //   road.getCarElement().animateCar(time);
  //   const status = await this.drive(road.getCar());
  //   if (status === 500) {
  //     road.getCarElement().stopAnimation();
  //   }

  //   if (status === 200) {
  //     return road;
  //   }
  // }

  public async startRace(roads: CarRoad[]): Promise<null| CarRoad> {
    let prevWinner: CarRoad | null = null;

    roads.forEach(async (road) => {
      const time = await this.startEngine(road.getCar());
      road.getCarElement().animateCar(time);
      const status = await this.drive(road.getCar());
      if (status === 500) {
        road.getCarElement().stopAnimation();
      }
      
      if (status === 200) {
        if (prevWinner) {
          const winnerTime = await this.startEngine(prevWinner.getCar())
          prevWinner = winnerTime < time ? road : prevWinner;
        } else {
          prevWinner = road;
        }
      }
    })

    return prevWinner;
  }

  public async stopRace(road: CarRoad): Promise<void> {
    await this.stopEngine(road.getCar());
    road.getCarElement().returnToStartPosition();
  }
}

export const carsFacade = new CarsFacade();
