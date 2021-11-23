import React from 'react';
import { Container, CircularProgress } from '@mui/material'


export type SpinnerProps = {
  size?: number;
  top?: number;
};

const defaultProps: SpinnerProps = {
  size: 150,
  top: 200,
};

export function Spinner (props: SpinnerProps): JSX.Element {
  const { size, top } = { ...defaultProps, ...props, };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: top,
  }

  return (
    <Container style={containerStyle}>
      <CircularProgress disableShrink size={size}/>
    </Container>
  );
}
