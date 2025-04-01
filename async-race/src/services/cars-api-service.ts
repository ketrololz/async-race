import { BASE_URL, CARS_PER_PAGE } from '../constants/app-settings';
import { PATHS } from '../constants/paths';
import type { Car } from '../types/car';

export class CarsApiService {
  public async get(): Promise<Car[]> {
    const response = await fetch(
      `${BASE_URL}${PATHS.garage}?_page=${1}&_limit=${CARS_PER_PAGE}`,
    );
    const cars = await response.json();
    return cars;
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

  public async setPage(page: number): Promise<Car[]> {
    const response = await fetch(
      `${BASE_URL}${PATHS.garage}?_page=${page}&_limit=${CARS_PER_PAGE}`,
    );
    const cars = await response.json();
    return cars;
  }
}
