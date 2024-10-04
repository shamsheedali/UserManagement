import React from 'react'
import { Navigate } from "react-router-dom";

const PrivateRouteAdmin = ({children}) => {
    const token = localStorage.getItem("token");

    return token ? children : <Navigate to="/admin_login" />;
}

export default PrivateRouteAdmin
