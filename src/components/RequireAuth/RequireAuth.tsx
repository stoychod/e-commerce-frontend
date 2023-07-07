import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useCheckAuthenticatedQuery } from "../../api/apiSlice";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import ErrorPage from "../ErrorPage/ErrorPage";

const RequireAuth = () => {
  const {
    data: isAuthenticated,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useCheckAuthenticatedQuery();
  const location = useLocation();

  const renderComponent = () => {
    if (isFetching) {
      return <LoadingScreen />;
    }

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
  };

  return renderComponent();
};

export default RequireAuth;
