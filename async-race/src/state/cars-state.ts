import { Observable } from '../utils/observable';
import { CarsApiService } from '../pages/garage/cars-api-service';
import type { Car } from '../types/car';

export class CarsState {
  public cars = new Observable<Car[]>([]);
  private carsApiService = new CarsApiService();

  public getCarById(id: number): Car | undefined {
    return this.cars.value.find((car) => car.id === id);
  }

  public async getCars(): Promise<void> {
    const allCars = await this.carsApiService.getCars();
    this.cars.update((cars) => cars.concat(allCars));
  }
}
