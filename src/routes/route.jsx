import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import UserProfile from "../pages/profile_pages/UserProfile";
import MyClients from "../pages/profile_pages/MyClients";
import RequiredAuth from "../utilities/RequiredAuth";
import AdminPageAuth from "../utilities/AdminPageAuth";
import AdminPage from "../pages/admin_pages/AdminPage";
import Err from "../components/Err";
import OverView from "../pages/admin_pages/OverView";
// import Dashboard from "../pages/Dashboard";

const RoutesContainer = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register/:id?" element={<Register />} />

      <Route element={<RequiredAuth />}>
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/profile/referrals-tree" element={<MyClients />} />

        <Route element={<AdminPageAuth />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/overview" element={<OverView />} />
        </Route>
      </Route>

      {/* Catch All */}
      <Route path="*" element={<Err />} />
    </Routes>
  );
};

export default RoutesContainer;
