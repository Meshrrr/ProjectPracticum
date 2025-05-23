import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children, allowedRoles = [] }) {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}