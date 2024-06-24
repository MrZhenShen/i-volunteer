import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { history } from '../../../utils/history';

export { PrivateRoute };

function PrivateRoute({ children }) {
    const { data: authUser } = useSelector(x => x.auth);
    
    if (!authUser) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/auth/sign-in" state={{ from: history.location }} />
    }

    // authorized so return child components
    return children;
}
