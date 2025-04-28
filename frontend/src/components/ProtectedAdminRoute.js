// src/components/ProtectedAdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';

const ProtectedAdminRoute = ({ children }) => {
  const { userInfo, loading } = useSelector((state) => state.userLogin);

  if (loading) {
    return <Loader />;
  }

  if (!userInfo?.token) {
    return <Navigate to="/login" replace />;
  }

  if (!userInfo.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;