
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminHome = () => {
  // Redirección inmediata sin useEffect para evitar parpadeo
  return <Navigate to="/dashboard" replace />;
};

export default AdminHome;
