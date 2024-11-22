import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {

    const isLoggedIn = !!localStorage.getItem('accessToken')

    if(isLoggedIn) {
        return children
    }
    else {
        localStorage.removeItem('accessToken')
        return <Navigate to='/login' replace />
    }
}

export default ProtectedRoute