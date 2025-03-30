import { BASE_URL } from '../../constants/app-settings';
import { PATHS } from '../../constants/paths';
import type { Car } from '../../types/car';

export class CarsApiService {
  public async getCars(): Promise<Car[]> {
    const response = await fetch(`${BASE_URL}${PATHS.garage}`);
    const cars = await response.json();
    return cars;
  }

  public async getCarById(id: number): Promise<Car | undefined> {
    const cars = await this.getCars();
    return cars.find((car) => car.id === id);
  }

  public async addCar(params: Omit<Car, 'id'>): Promise<Car> {
    const response = await fetch(`${BASE_URL}${PATHS.garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    return await response.json();
  }

  public async removeCar(car: Car): Promise<void> {
    await fetch(`${BASE_URL}${PATHS.garage}/${car.id}`, {
      method: 'delete',
    });
  }
}
