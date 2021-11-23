import React from 'react';
import { TablePagination } from '@mui/material';

import { Location } from '../helpers';


export type PagePaginationProps = {
  count?: number;
  initialIndex?: number;
  initialSize?: number;
};

export function PagePagination (props: PagePaginationProps): JSX.Element {
  const {
    count = 0,
    initialIndex = 1,
    initialSize = 10,
  } = props;

  const pageSize = Location.getPageSize({ count, initialSize });
  const pageIndex = Location.getPageIndex({ count, initialSize, initialIndex });

  const getRowsPerPageOptions = (): number[] => {
    const rowsPerPageOptions = [];
    let option = initialSize;

    while (option < count && rowsPerPageOptions.length < 4) {
      rowsPerPageOptions.push(option);
      option = option * 2;
    }

    return rowsPerPageOptions;
  }

  const rowsPerPageOptions = getRowsPerPageOptions();

  const goToPage = (pageIndex: number, pageSize: number) => {
    const url = new URL(Location.getUrl());
    const qsParams = Location.getQueryParams();

    const qs = url.searchParams;
    qs.set(qsParams.page, pageIndex.toString());
    qs.set(qsParams.pageSize, pageSize.toString());

    Location.redirect(url.href);
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    goToPage(newPage + 1, pageSize);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newPageSize = parseInt(event.target.value, 10);
    goToPage(1, newPageSize);
  };

  return (
    <TablePagination
      component='div'
      count={count}
      page={pageIndex - 1}
      rowsPerPage={pageSize}
      rowsPerPageOptions={rowsPerPageOptions}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}