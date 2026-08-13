import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF]">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-[#BE185D] border-t-[#FACC15] rounded-full animate-spin mx-auto" />
          <p className="font-cinzel text-[#BE185D] font-bold">Verifying Admin Credentials...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
