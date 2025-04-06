import { BASE_URL, WiNNERS_PER_PAGE } from '../constants/app-settings';
import { PATHS } from '../constants/paths';
import type { WinnersSort } from '../types/winners-sort';
import type { Winner } from '../types/winner';
import type { SortOrder } from '../types/sort-order';

export class WinnersApiService {
  private readonly baseUrl = `${BASE_URL}${PATHS.winners}`;
  private totalCount: string | null = null;

  public get totalWinners(): string {
    return this.totalCount ?? '0';
  }

  public async getPage(
    page: number = 1,
    sort: WinnersSort,
    order: SortOrder,
  ): Promise<Winner[]> {
    const query = `?_page=${page}&_limit=${WiNNERS_PER_PAGE}&_sort=${sort}&_order=${order}`;
    const response = await fetch(this.baseUrl.concat(query));
    const winners = await response.json();

    this.totalCount = response.headers.get('X-Total-Count');
    return winners;
  }

  public async getWinner(id: number): Promise<Winner | undefined> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    const car = await response.json();
    return car;
  }

  public async delete(id: number = 1): Promise<void> {
    await fetch(`${this.baseUrl}/${id}`, {
      method: 'delete',
    });
  }

  public async info(id: number): Promise<Winner> {
    const query = `?id=${id}`;
    const response = await fetch(this.baseUrl.concat(query), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }

  public async add(params: Winner): Promise<void> {
    await fetch(`${this.baseUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
  }

  public async update(params: Winner): Promise<void> {
    await fetch(`${this.baseUrl}/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ wins: params.wins, time: params.time }),
    });
  }
}
