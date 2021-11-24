import React, { useState, useEffect } from 'react';
import { isEqual } from 'lodash';

import {
  apiClient,
  Location,
  Page,
  Spinner,
} from '../common';

import { CompaniesPageBar } from './companiesPageBar';
import { CompaniesPageGrid } from './companiesPageGrid';
import { CompaniesPageSpecialtiesList } from './companiesPageSpecialtiesList';
import { CompanyProps } from './company';


export function CompaniesPage(): JSX.Element {
  const companiesInitialState: unknown[] = [];
  const totalCompaniesCountInitialState = 0;
  const specialtiesInitialState: string[] = [];
  const selectedSpecialtiesInitialState: Set<string> = new Set();
  const imagesCountInitialState = 0;
  const searchFilterInitialState = '';
  const noResultInitialState = false;

  const [ companies, setCompanies ] = useState<unknown[]>(companiesInitialState);
  const [ specialties, setSpecialties ] = useState<string[]>(specialtiesInitialState);
  const [ selectedSpecialties, setSelectedSpecialties ] = useState<Set<string>>(selectedSpecialtiesInitialState);
  const [ imagesCount, setImagesCount ] = useState<number>(imagesCountInitialState);
  const [ searchFilter, setSearchFilter ] = useState<string>(searchFilterInitialState);
  const [ totalCompaniesCount, setTotalCompaniesCount ] = useState<number>(totalCompaniesCountInitialState);
  const [ noResult, setNoResult ] = useState<boolean>(noResultInitialState);

  const paginationState = {
    count: totalCompaniesCount,
    initialSize: 12,
    initialIndex: 1,
  };

  const incrementImageCount = () => {
    setImagesCount(imagesCount + 1);
  };

  const fetchSpecialties = async () => {
    const specialties = await apiClient.getSpecialties();
    setSpecialties(specialties);
    setSelectedSpecialties(new Set(specialties));
  }

  useEffect(() => {
    if (noResult) alert('No results!');
  }, [ noResult ])

  useEffect(() => {
    if (!specialties.length) fetchSpecialties();
  }, [ specialties ]);

  const url = Location.useUrl();

  const fetchCompanies = async () => {
    const pageIndex = Location.getPageIndex(paginationState);
    const pageSize = Location.getPageSize(paginationState);

    const { companies: newCompanies , count } = await apiClient.getCompanies({
      name: searchFilter,
      specialties: Array.from(selectedSpecialties),
      limit: pageSize,
      offset: pageIndex - 1,
    });

    setNoResult(!newCompanies.length);

    const newImageCount = newCompanies.filter((company, i) => isEqual(company, companies[i])).length;
    setImagesCount(newImageCount);

    setTotalCompaniesCount(count);
    setCompanies(newCompanies);
  }

  useEffect(() => {
    if (selectedSpecialties.size) {
      fetchCompanies();
    } else {
      setCompanies(companiesInitialState);
      setImagesCount(imagesCountInitialState);
    }
  }, [ url, searchFilter, selectedSpecialties ]);

  const handleOnSearchInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const newSearchFilter = e.target.value;
    setSearchFilter(newSearchFilter);
  };

  const haveSpecialities = !!specialties.length;
  const haveCompanies = !!companies.length;
  const gridIsLoaded = haveSpecialities && haveCompanies && companies.length === imagesCount;

  const showSpinner = !noResult && !gridIsLoaded;
  const showSpecialitiesList = haveSpecialities;
  const loadGrid = haveSpecialities && haveCompanies;

  const elementWrapperStyle = {
    display: 'flex',
  };

  return (
    <Page
      title='Companies'
      bar={
        <CompaniesPageBar
          searchValue={searchFilter}
          onSearchInputChange={handleOnSearchInputChange}
        />
      }
      element={
        <div
          id='main-element'
          style={elementWrapperStyle}
        >
          { showSpinner && <Spinner /> }
          {
            loadGrid &&
            <CompaniesPageGrid
              companies={
                (companies as CompanyProps[]).map(({ logo, ...rest }) => ({
                  ...rest,
                  logo: {
                    ...logo,
                    onLoad: incrementImageCount,
                    onError: incrementImageCount,
                  }
                }))
              }
              displayGrid={gridIsLoaded}
              pagination={paginationState}
            />
          }
          {
            showSpecialitiesList &&
            <CompaniesPageSpecialtiesList
              specialties={specialties}
              selectedSpecialties={selectedSpecialties}
              onItemChange={
                (specialty: string, checked: boolean) => {
                  if (!checked) selectedSpecialties.delete(specialty)
                  else selectedSpecialties.add(specialty);

                  if (!selectedSpecialties.size) {
                    setTimeout(() => setNoResult(true), 500);
                  }
                  setSelectedSpecialties(new Set(selectedSpecialties));
                }
              }
            />
          }
        </div>
      }
    />
  );
}