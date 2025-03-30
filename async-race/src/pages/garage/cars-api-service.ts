import { BASE_URL } from '../../constants/app-settings';
import { PATHS } from '../../constants/paths';
import type { Car } from '../../types/car';

export class CarsApiService {
  public async get(): Promise<Car[]> {
    const response = await fetch(`${BASE_URL}${PATHS.garage}`);
    const cars = await response.json();
    return cars;
  }

  public async getById(id: number): Promise<Car | undefined> {
    const cars = await this.get();
    return cars.find((car) => car.id === id);
  }

  public async add(params: Omit<Car, 'id'>): Promise<Car> {
    const response = await fetch(`${BASE_URL}${PATHS.garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    return await response.json();
  }

  public async remove(car: Car): Promise<void> {
    await fetch(`${BASE_URL}${PATHS.garage}/${car.id}`, {
      method: 'delete',
    });
  }

  public async update(car: Car): Promise<void> {
    await fetch(`${BASE_URL}${PATHS.garage}/${car.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: car.name, color: car.color }),
    });
  }
}
