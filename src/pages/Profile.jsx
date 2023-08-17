import axios from "../api/axios";
import { useEffect, useState } from "react";
const Profile = () => {
  useEffect(() => {
    const getSingleUser = async () => {
      try {
        const response = await axios.get("/users/profile", {
          withCredentials: true,
        });
      } catch (error) {}
    };
    getSingleUser();
    location.reload();
  }, []);

  return <div>Profile</div>;
};

export default Profile;
