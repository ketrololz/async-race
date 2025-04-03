import { Observable } from '../utils/observable';
import { CarsApiService } from '../services/cars-api-service';
import type { Car } from '../components/car';
import { CARS_PER_PAGE } from '../constants/app-settings';
import { EngineApiService } from '../services/engine-api-service';

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
      const cars = await this.carsApiService.get(page);
      this._page = page;
      this.carList.set(cars);
    }
  }

  public async startEngine(car: Car): Promise<void> {
    await this.engineApiService.start(car.id);
  }

  public async stopEngine(car: Car): Promise<void> {
    await this.engineApiService.stop(car.id);
  }
}

export const carsFacade = new CarsFacade();
