
export type PaginationQS = {
  limit: number,
  offset: number,
}

export type CompaniesQS = PaginationQS & {
  specialties: string[],
  name?: string,
}