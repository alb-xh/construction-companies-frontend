import React from 'react';

import { CheckboxList } from '../common';


export type CompaniesPageSpecialtiesListProps = {
  specialties: string[];
  selectedSpecialties: Set<string>;
  onItemChange: (specialty: string, checked: boolean) => void;
}

export function CompaniesPageSpecialtiesList(props: CompaniesPageSpecialtiesListProps): JSX.Element {
  const { specialties, selectedSpecialties, onItemChange } = props;

  const specialtiesListStyle = {
    margin: 16,
    marginLeft: 'auto',
    padding: 20,
    width: 250,
    height: 'fit-content',
    maxHeight: 500,
    flexShrink: 0,
  };

  return (
    <CheckboxList
      title='Specialties'
      style={specialtiesListStyle}
      items={
        specialties.map((specialty) => ({
          label: specialty,
          checked: selectedSpecialties.has(specialty),
          onChange: (e: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
            onItemChange(specialty, checked);
          }

        }))
      }
    />
  );
}
