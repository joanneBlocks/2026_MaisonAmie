import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { session } = UserAuth();

  // ✅ If user is not logged in
  if (!session) {
    return <Navigate to="/signup" replace />;
  }

  // ✅ User is logged in
  return <>{children}</>;
};

export default PrivateRoute;
