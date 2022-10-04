import {
    Navigate,
    Outlet,
  } from 'react-router-dom';
  
  const ProtectedRoute = ({ user, redirectPath = '/' } : any) => {
    if (!user || JSON.stringify(user) === "{}") {
      return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
  };

  export default ProtectedRoute;
  