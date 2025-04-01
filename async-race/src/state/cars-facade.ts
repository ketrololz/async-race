import { Observable } from '../utils/observable';
import { CarsApiService } from '../services/cars-api-service';
import type { Car } from '../types/car';
import { CARS_PER_PAGE } from '../constants/app-settings';

class CarsFacade {
  public carList = new Observable<Car[]>([]);
  private carsApiService = new CarsApiService();
  private _page = 1;

  public get page(): number {
    return this._page;
  }

  public async get(): Promise<void> {
    const allCarList = await this.carsApiService.get();
    this.carList.set(allCarList);
  }

  public async remove(car: Car): Promise<void> {
    try {
      await this.carsApiService.remove(car);
      this.carList.update((cars) => cars.filter((elem) => elem.id !== car.id));
      this.setPage(this._page);
    } catch (e) {
      console.warn(e);
    }
  }

  public async create(params: { name: string; color: string }): Promise<void> {
    const car = await this.carsApiService.add(params);
    if (this.carList.value.length < CARS_PER_PAGE) {
      this.carList.update((cars) => cars.concat(car));
    }
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

  public async setPage(page: number): Promise<void> {
    if (page > 0) {
      const cars = await this.carsApiService.setPage(page);
      this._page = page;
      this.carList.set(cars);
    }
  }
}

export const carsFacade = new CarsFacade();
