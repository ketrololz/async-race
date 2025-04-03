import { BASE_URL } from '../constants/app-settings';
import { PATHS } from '../constants/paths';

export class EngineApiService {
  private readonly baseUrl = `${BASE_URL}${PATHS.engine}`;

  public async start(id: number): Promise<void> {
    const query = `?id=${id}&status=started`;
    const response = await fetch(this.baseUrl.concat(query), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    response.json().then((data) => console.log(data));
    return;
  }

  public async stop(id: number): Promise<void> {
    const query = `?id=${id}&status=stopped`;
    const response = await fetch(this.baseUrl.concat(query), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    response.json().then((data) => console.log(data));
    return;
  }
}
