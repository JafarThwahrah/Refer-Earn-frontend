import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "../api/axios";
const Header = () => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        const accessToken = Cookies.get("accessToken");
        const response = await axios.get(`profile/user-profile`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          signal: abortController.signal,
        });

        setUserData({
          total_views: response.data.data.total_views,
          unique_views: response.data.data.unique_views,
          total_points: response.data.data.total_points,
          referral_link: response.data.data.referral_link,
          points_per_day: response.data.data.points_per_day,
          user_name: response.data.data.user_name,
          user_image: response.data.data.user_image,
          is_admin: response.data.data.is_admin,
        });
      } catch (error) {
        if (!abortController.signal.aborted) {
        }
      }
    })();
    // Clean up the abort controller
    return () => {
      abortController.abort();
    };
  }, []);

  const handleLogout = async () => {
    try {
      const accessToken = Cookies.get("accessToken");
      Cookies.remove("accessToken");
      await axios.post("/api/logout", null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {}
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-primary bg-gradient ">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userData.is_admin && (
                <>
                  <li className="nav-item">
                    <a
                      className="nav-link text-white"
                      aria-current="page"
                      href="/admin"
                    >
                      Admin
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-white"
                      aria-current="page"
                      href="/overview"
                    >
                      Overview
                    </a>
                  </li>
                </>
              )}
            </ul>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-end w-100">
              {userData.user_name && (
                <>
                  <li className="nav-item">
                    <a
                      className="nav-link text-white"
                      href="/profile/referrals-tree"
                      aria-current="page"
                    >
                      My Clients
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-white"
                      href="/profile"
                      aria-current="page"
                    >
                      Profile
                    </a>
                  </li>
                </>
              )}
              {userData.user_name ? (
                <li className="nav-item">
                  <a
                    onClick={handleLogout}
                    className="nav-link text-white"
                    aria-current="page"
                    href="/"
                  >
                    Logout
                  </a>
                </li>
              ) : (
                <li className="nav-item">
                  <a
                    className="nav-link text-white"
                    href="/"
                    aria-current="page"
                  >
                    Login
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
