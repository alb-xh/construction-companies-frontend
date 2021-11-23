import React from 'react';

import { SearchInput, PageBar } from '../common';


export type CompaniesPageBarProps = {
  searchValue: string,
  onSearchInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
};

export function CompaniesPageBar (props: CompaniesPageBarProps): JSX.Element {
  const { searchValue, onSearchInputChange } = props;

  const title = 'Companies';

  const searchInput = <SearchInput
    value={searchValue}
    onChange={onSearchInputChange}
  />

  return (
    <PageBar
      title={title}
      element={searchInput}
    />
  );
}
