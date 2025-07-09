import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();

  // Not logged in: redirect to login and remember attempted page
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Admin-only route: restrict access to non-admins
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Authorized access
  return children;
};

export default ProtectedRoute;
