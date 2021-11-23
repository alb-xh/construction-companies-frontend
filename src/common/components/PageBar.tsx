import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';


export type PageBarProps = {
  title: string,
  element?: React.ReactNode,
}

export function PageBar(props: PageBarProps): JSX.Element{
  const { title, element } = props;

  const barTitle = (
    <Typography
      variant='h6'
      noWrap
      component='div'
      sx={{ display: { xs: 'none', sm: 'block' } }}
    >
      {title}
    </Typography>
  );

  return (
    <Box
      sx={{ flexGrow: 1 }}
      marginBottom='70px'>
      <AppBar
        position='fixed'
        color='primary'
      >
        <Toolbar>
          {barTitle}
          {element}
        </Toolbar>
      </AppBar>
    </Box>
  );
}