import getCookie from "./GetCookie";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequiredAuth = () => {
  const token = getCookie("accessToken");
  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequiredAuth;
