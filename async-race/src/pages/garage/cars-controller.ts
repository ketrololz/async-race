import { BASE_URL } from '../../constants/app-settings';
import { PATHS } from '../../constants/paths';
import type { Car } from '../../types/car';

class CarsController {
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
}

export const carsController = new CarsController();
