import { Observable } from '../utils/observable';
import { CarsApiService } from '../pages/garage/cars-api-service';
import type { Car } from '../types/car';

export class CarsFacade {
  public cars = new Observable<Car[]>([]);
  private carsApiService = new CarsApiService();

  // public getCarById(id: number): Car | undefined {
  //   return this.cars.value.find((car) => car.id === id);
  // }

  public async getCars(): Promise<void> {
    const allCars = await this.carsApiService.getCars();
    this.cars.update((cars) => cars.concat(allCars));
  }

  public async removeCar(car: Car): Promise<void> {
    try {
      await this.carsApiService.removeCar(car);
      this.cars.update((cars) => cars.filter((elem) => elem.id !== car.id));
      console.log(this.cars);
    } catch (e) {
      console.warn(e);
    }
  }

  public async createCar(params: {
    name: string;
    color: string;
  }): Promise<void> {
    const newCar = await this.carsApiService.addCar(params);
    this.cars.update((cars) => cars.concat(newCar));
  }
}
