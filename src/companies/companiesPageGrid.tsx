import React from 'react';

import { Grid, PagePagination } from '../common';
import { Company, CompanyProps } from './company'


export type CompaniesPageGridProps = {
  companies: CompanyProps[];
  displayGrid: boolean
  pagination: {
    count: number,
    initialSize: number,
    initialIndex: number,
  }
}

export function CompaniesPageGrid (props: CompaniesPageGridProps): JSX.Element {
  const { companies, displayGrid, pagination } = props;

  const gridWrapperStyle = {
    display: displayGrid ? 'block' : 'none',
    width: '-webkit-fill-available',
  }

  return (
    <div
      id='grid-wrapper'
      style={gridWrapperStyle}
    >
      <Grid
        items={
          companies.map((company, i) => {
            return <Company
              key={i}
              {...company}
            />
          })
        }
        pagination={
          <PagePagination {...pagination} />
        }
      />
    </div>
  )
}