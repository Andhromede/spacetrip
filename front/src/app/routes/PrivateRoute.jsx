import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { URL_HOME, URL_LOGIN } from '../constants/urls/urlFrontEnd';
import { selectHasRole, selectIsLogged } from '../redux-store/authenticationSlice';

// import simpleRestProvider from 'ra-data-simple-rest';
// import { Admin, Resource, CustomRoutes } from 'react-admin';
// import * as URL from "../constants/urls/urlFrontEnd";

/**
<PrivateRoute path={URL_HOME} element={HomeView} />
<PrivateRoute path={URL_ADMIN_HOME} element={AdminHomeView} role={[ROLE_ADMIN]} />
 */

export const PrivateRoute = ({ children, role }) => {
    const location = useLocation();
    const isAuthenticated = useSelector(selectIsLogged);
    const hasRole = useSelector((state) => state?.auth?.user?.role);

    if (!isAuthenticated) return <Navigate replace to={URL_LOGIN} state={{ from: location }} />;

    if (role===null || role===undefined || !role[0] || !hasRole || role[0] != hasRole) return <Navigate replace to={{ pathname: URL_HOME }} />;

    if (role[0] == hasRole) {
        return children;
    }
};
