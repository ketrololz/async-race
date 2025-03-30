import { BASE_URL } from '../../constants/app-settings';
import { PATHS } from '../../constants/paths';
import type { Car } from '../../types/car';

export class CarsApiService {
  public async getCars(): Promise<Car[]> {
    const response = await fetch(`${BASE_URL}${PATHS.garage}`);
    const cars = await response.json();
    console.log(cars);
    return cars;
  }

  public async getCarById(id: number): Promise<Car | undefined> {
    const cars = await this.getCars();
    console.log(cars[id]);
    return cars.find((car) => car.id === id);
  }

  public async addCar(params: { name: string, color: string }): Promise<void> {
    const response = await fetch(`${BASE_URL}${PATHS.garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    });
    const car = await response.json();
    console.log(car);
  }
}
