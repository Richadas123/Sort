// import React from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, isLoading } = useAuth0();

//   if (isLoading) {
//     return <div className="text-white text-center mt-10">Loading...</div>;
//   }

//   return isAuthenticated ? children : <Navigate to="/" />;
// };

// export default ProtectedRoute;



<<<<<<< HEAD
=======


>>>>>>> 486cda686ee067fc6b91d8ea38bf833b87aa7157
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const location = useLocation();

  if (isLoading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default ProtectedRoute;
