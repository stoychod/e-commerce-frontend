import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useCheckAuthenticatedQuery } from "../../api/apiSlice";

const RequireAuth = () => {
  const { data: isAuthenticated } = useCheckAuthenticatedQuery();
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
