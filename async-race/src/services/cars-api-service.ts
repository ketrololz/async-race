import { BASE_URL, CARS_PER_PAGE } from '../constants/app-settings';
import { PATHS } from '../constants/paths';
import type { Car } from '../components/car';

export class CarsApiService {
  private readonly baseUrl = `${BASE_URL}${PATHS.garage}`;
  private totalCount: string | null = null;
  
  public get totalCars(): string {
    return this.totalCount ?? '0';
  }

  public async get(page: number = 1): Promise<Car[]> {
    const query = `?_page=${page}&_limit=${CARS_PER_PAGE}`;
    const response = await fetch(this.baseUrl.concat(query));
    const cars = await response.json();

    this.totalCount = response.headers.get('X-Total-Count');
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
    await fetch(`${this.baseUrl}/${car.id}`, {
      method: 'delete',
    });
  }

  public async update(car: Car): Promise<void> {
    await fetch(`${this.baseUrl}/${car.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: car.name, color: car.color }),
    });
  }
}
