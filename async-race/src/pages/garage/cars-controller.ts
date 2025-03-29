import { BASE_URL } from '../../constants/app-settings';
import { PATHS } from '../../constants/paths';

class CarsController {
  public async getCars() {
    const response = await fetch(`${BASE_URL}${PATHS.garage}`);
    const cars = await response.json();
    console.log(cars);
  }
}

export const carsController = new CarsController();
