import { WiNNERS_PER_PAGE } from '../constants/app-settings';
import { WinnersApiService } from '../services/winners-api-service';
import { Observable } from '../utils/observable';
import type { Winner } from '../types/winner';
import type { WinnersSort } from '../types/winners-sort';
import { SortOrder } from '../types/sort-order';

class WinnersFacade {
  public winnerList = new Observable<Winner[]>([]);
  private winnersApiService = new WinnersApiService();
  private _page = 1;
  private sortOrder = SortOrder.ASC;

  public get totalCount(): string {
    return this.winnersApiService.totalWinners;
  }

  public get page(): number {
    return this._page;
  }

  public async getById(id: number): Promise<Winner | undefined> {
    const car = await this.winnersApiService.getWinner(id);
    return car;
  }

  public async add(winner: Winner): Promise<void> {
    try {
      await this.winnersApiService.add(winner);
      this.winnerList.update((cars) => cars.concat(winner));
    } catch (e) {
      console.warn(e);
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await this.winnersApiService.delete(id);
      this.winnerList.value.filter((cars) => cars.id !== cars.id);
    } catch (e) {
      console.warn(e);
    }
  }

  public async setPage(page: number = 1, typeSort: WinnersSort): Promise<void> {
    const totalPages =
      Math.ceil(Number(this.totalCount) / WiNNERS_PER_PAGE) || 1;
    if (page > 0 && page <= totalPages) {
      const cars = await this.winnersApiService.getPage(page, typeSort, this.sortOrder);
      this._page = page;
      this.winnerList.set(cars);
    }
  }

  public changeSortOrder(): void {
    if (this.sortOrder === SortOrder.ASC) {
      this.sortOrder = SortOrder.DESC;
    } else {
      this.sortOrder = SortOrder.ASC;
    }
  }

  public async update(car: Winner): Promise<void> {
    try {
      await this.winnersApiService.update(car);
      this.winnerList.update((cars) =>
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

export const winnersFacade = new WinnersFacade();
