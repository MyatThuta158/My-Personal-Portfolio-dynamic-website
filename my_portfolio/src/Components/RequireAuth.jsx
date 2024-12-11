import React from "react";
import { useAuth } from "./Auth";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const auth = useAuth();

  console.log(auth.user);
  if (!auth.user) {
    return <Navigate to={"/loginMTT"} />;
  }
  return children;
};

export default RequireAuth;
