import { BASE_URL } from '../constants/app-settings';
import { PATHS } from '../constants/paths';

export class EngineApiService {
  private readonly baseUrl = `${BASE_URL}${PATHS.engine}`;

  public async start(id: number): Promise<Record<string, number>> {
    const query = `?id=${id}&status=started`;
    const response = await fetch(this.baseUrl.concat(query), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }

  public async stop(id: number): Promise<void> {
    const query = `?id=${id}&status=stopped`;
    await fetch(this.baseUrl.concat(query), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return;
  }

  public async drive(id: number): Promise<number> {
    try {
      const query = `?id=${id}&status=drive`;
      const response = await fetch(this.baseUrl.concat(query), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return response.status;
    } catch(e) {
      console.log(e)
      return 0;
    }
  }
}
