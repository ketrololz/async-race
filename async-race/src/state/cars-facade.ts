import { Observable } from '../utils/observable';
import { CarsApiService } from '../pages/garage/cars-api-service';
import type { Car } from '../types/car';

class CarsFacade {
  public carList = new Observable<Car[]>([]);
  private carsApiService = new CarsApiService();

  public async get(): Promise<void> {
    const allCarList = await this.carsApiService.get();
    this.carList.update((cars) => cars.concat(allCarList));
  }

  public async remove(car: Car): Promise<void> {
    try {
      await this.carsApiService.remove(car);
      this.carList.update((cars) => cars.filter((elem) => elem.id !== car.id));
      console.log(this.carList);
    } catch (e) {
      console.warn(e);
    }
  }

  public async create(params: {
    name: string;
    color: string;
  }): Promise<void> {
    const newCar = await this.carsApiService.add(params);
    this.carList.update((cars) => cars.concat(newCar));
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
}

export const carsFacade = new CarsFacade();
