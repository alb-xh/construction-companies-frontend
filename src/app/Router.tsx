import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { CompaniesPage } from '../companies';


export function Router(): JSX.Element {
  const paths = {
    home: '/',
    companies: '/companies',
  };

  const routes = [
    {
      path: paths.home,
      element: <Navigate replace to={paths.companies}/>
    },
    {
      path: paths.companies,
      element: <CompaniesPage />,
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {
          routes.map((route, i) => (
            <Route key={i} {...route} />
          ))
        }
      </Routes>
    </BrowserRouter>
  );
}
