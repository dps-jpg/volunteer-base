import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { readLocalStorage } from 'shared/lib/localStorage';

export const PrivateRoute: FC = () => {
  if (!readLocalStorage('token')) {
    return <Navigate to={'/admin-auth'} />;
  }
  return <Outlet />;
};
