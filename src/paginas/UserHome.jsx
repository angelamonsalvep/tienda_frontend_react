import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/catalogo', { replace: true });
  }, [navigate]);
  return null;
};

export default UserHome;
