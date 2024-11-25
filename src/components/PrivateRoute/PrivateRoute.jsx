import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../../context/authContext';

export const PrivateAdminRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return;
    }

    if (!user || user.roles[0] !== "ADMIN") {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export const PrivateUserRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export const AuthRedirectRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return;
    }

    if (user) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};