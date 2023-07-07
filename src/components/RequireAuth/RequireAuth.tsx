import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useCheckAuthenticatedQuery } from "../../api/apiSlice";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import ErrorPage from "../ErrorPage/ErrorPage";

const RequireAuth = () => {
  const {
    data: isAuthenticated,
    isSuccess,
    isError,
    error,
  } = useCheckAuthenticatedQuery();
  const location = useLocation();

  const renderComponent = () => {
    if (isError) {
      console.log(error);
      return <ErrorPage />;
    }

    if (isSuccess) {
      if (isAuthenticated === true) {
        return <Outlet />;
      }

      return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return <LoadingScreen />;
  };

  return renderComponent();
};

export default RequireAuth;
