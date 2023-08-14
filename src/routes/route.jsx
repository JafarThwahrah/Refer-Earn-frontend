import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
// import Dashboard from "../pages/Dashboard";
const RoutesContainer = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register/:id?" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </>
  );
};

export default RoutesContainer;
