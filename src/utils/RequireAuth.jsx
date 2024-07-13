import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function RequireAuth() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location])

  const { token } = useSelector(state => state?.auth?.user);

  return token ? (
      <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
