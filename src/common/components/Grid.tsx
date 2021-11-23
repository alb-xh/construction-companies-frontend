import React from 'react';
import {
  Box,
  Grid as MuiGrid,
} from '@mui/material'

import { PagePagination } from './PagePagination';


export type GridProps = {
  items: React.ReactNode[];
  pagination?: React.ReactNode;
  count?: number;
};

export function Grid (props: GridProps): JSX.Element {
  const { items, pagination, count } = props;

  const gridItems = items.map((item, i) =>(
    <MuiGrid key={i} item xs={2}>
      {item}
    </MuiGrid>
  ));

  const paginationComponent = pagination || <PagePagination count={count} />

  return (
    <Box padding={2}>
      <MuiGrid container justifyContent='center' spacing={2} >
        {gridItems}
      </MuiGrid>
      {paginationComponent}
    </Box>
  );
}