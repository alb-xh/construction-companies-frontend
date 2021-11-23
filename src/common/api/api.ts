import { CompaniesQS } from './types';

export class Api {
  public readonly baseUrl: string;

  constructor (baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getUrl (pathname: string): string {
    return [ this.baseUrl, pathname ].join('/');
  }

  // TODO: add error handling, restart on components
  async getSpecialties(): Promise<string[]> {
    const url = this.getUrl('specialties');

    const res = await fetch(url);
    const specialties = await res.json();

    return specialties as string[];
  }

  // TODO: add error handling, restart on components, use qs lib
  async getCompanies (qs: CompaniesQS): Promise<{ companies: unknown[], count: number}> {
    const { specialties, name, limit, offset } = qs;

    const url = this.getUrl('companies');

    const oUrl = new URL(url);
    const qParams = oUrl.searchParams;

    qParams.set('limit', limit.toString());
    qParams.set('offset', (limit * offset).toString());

    if (specialties.length === 1) {
      qParams.append('specialties[]', specialties[0]);
    } else {
      specialties.forEach((specialty) => {
        qParams.append('specialties', specialty);
      });
    }

    if (name) qParams.set('name', name);

    const res = await fetch(oUrl.href);
    const { companies, count } = await res.json();

    return { companies, count };
  }
}
