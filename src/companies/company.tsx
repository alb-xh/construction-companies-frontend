import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@mui/material';


export type CompanyProps = {
  name: string,
  specialty: string,
  city: string,
  logo: {
    src: string,
    alt: string,
    onLoad?: React.ReactEventHandler<HTMLImageElement>,
    onError?: React.ReactEventHandler<HTMLImageElement>
  },
}

export function Company(company: CompanyProps): JSX.Element {
  const { name, specialty, city, logo } = company;
  const { src, alt, onLoad, onError } = logo;

  const companyImage = <CardMedia
    component='img'
    width= '200'
    image={src}
    alt={alt}
    onLoad={onLoad}
    onError={onError}
  />;

  const companyData = <CardContent>
    <Typography gutterBottom variant='h5' component='div'>
      {name}
    </Typography>
    <Typography variant='subtitle1'>
      {specialty}
    </Typography>
    <Typography variant='body2' color='text.secondary'>
      {city}
    </Typography>
  </CardContent>;

  const contactCompany = <Button size='small' color='primary'>
    Contact
  </Button>

  return (
    <Card raised sx={{ maxWidth: 345, bgcolor: 'rgba(255, 255, 255, 0.75)' }}>
      <CardActionArea>
        {companyImage}
        {companyData}
      </CardActionArea>
      <CardActions>
        {contactCompany}
      </CardActions>
    </Card>
  );
}