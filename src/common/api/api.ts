import { CompaniesQS, PaginationQS } from './types';

const specialities = [ 'Excavation', 'Plumbing', 'Electrical', 'Parket', 'Sanitary' ];

let id=0
export class Api {
  public readonly baseUrl: string;

  constructor (baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getUrl (pathname: string, qs?: Record<string, string | number>): string {
    const url = [ this.baseUrl, pathname ].join('/');
    if (!qs) return url;

    const query = Object.entries(qs)
      .map((pair) => pair.join('='));

    return [ url, query ].join('?')
  }

  async getSpecialties(qs?: PaginationQS): Promise<string[]> {
    const url = this.getUrl('/specialties', qs);

    return new Promise((resolve) => {
      setTimeout(() => resolve(specialities), 1 * 1000);
    });
  }

  async getCompanies (qs: CompaniesQS): Promise<{ companies: unknown[], count: number}>  {

    //await fetch(url)

    const randomString = (): string => (Math.random() + 1).toString(36).substring(7);
    const randomSpeciality = () => {
      const randomIndex = Math.floor(Math.random() * specialities.length);

      return specialities[randomIndex];
    }

    const generateRandomCompanies = (limit = 10): Array<unknown> => (
      [ ...Array(limit) ].map((el, i) => (
        {
          name: randomString(),
          logo: {
            src: `https://picsum.photos/120/90?id=${id++}`,
            alt: 'Google logo',
          },
          specialty: randomSpeciality(),
          city: 'London',
        }
      ))
        .filter((company) => qs.specialties.includes(company.specialty))
    )

    return new Promise((resolve) => {
      const companies = generateRandomCompanies(qs.limit);
      console.log(qs.specialties, qs.limit)
      console.log(companies);
      const count = companies.length < qs.limit
        ? companies.length
        : Math.floor(Math.random()  * 1000) + 100;

      setTimeout(() => resolve({ companies, count }), 1 * 1000);
    });
  }
}
