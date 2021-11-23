import React from 'react';
import { Box } from '@mui/material';
import { PageBar } from './PageBar';


export type PageProps = {
  title: string,
  bar?: React.ReactNode,
  element?: React.ReactNode,
};

export function Page(props: PageProps): JSX.Element {
  const { title, bar, element } = props;

  document.title = title;
  const pageBar = bar || PageBar({ title });

  return (
    <Box>
      {pageBar}
      {element}
    </Box>
  );
}
