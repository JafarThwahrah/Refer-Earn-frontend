import getCookie from "./GetCookie";
const useLogout = () => {
  //   const navigate = useNavigate();
  const logout = () => {
    const token = getCookie("token");
    const headers = { Authorization: `${token}` };
    const req = async () => {
      //   try {
      document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    };
    req();
  };

  return { logout };
};

export default useLogout;
