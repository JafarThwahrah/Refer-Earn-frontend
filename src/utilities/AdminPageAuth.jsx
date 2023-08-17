import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import Cookies from "js-cookie";
const AdminPageAuth = () => {
  const [role, setUserRole] = useState({});
  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        const response = await axios.get(`profile/user-profile`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          signal: abortController.signal,
        });

        setUserRole(response.data.data.is_admin);
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.log(error);
        }
      }
    })();
    return () => {
      abortController.abort();
    };
  }, []);
  const location = useLocation();
  return accessToken && role ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default AdminPageAuth;
