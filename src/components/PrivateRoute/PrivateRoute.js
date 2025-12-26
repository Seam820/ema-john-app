import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../App'; 

const PrivateRoute = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const location = useLocation();

    // Check if email exists (or if user is signed in)
    if (loggedInUser.email) {
        return children;
    }
    
    // If not logged in, redirect to Login and remember where they were trying to go
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;