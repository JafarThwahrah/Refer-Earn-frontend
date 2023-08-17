import React, { useEffect } from "react";
import UserLineChart from "../../components/LineChart";
import Cookies from "js-cookie";
import "../../styles/styles.css";
import axios from "../../api/axios";
import { useState } from "react";

function UserProfile() {
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
          level: response.data.data.level,
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
  return (
    <>
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-around">
          <div className="mt-5">
            <div className="card text-bg-light m-3">
              <div className="card-body">
                <img className="image_style" src={userData.user_image} alt="" />
                <h6>{userData.level}</h6>
                <h5 className="card-title">{userData.user_name}</h5>
                <p className="card-text link_style">
                  Referral Link : {userData.referral_link}
                </p>
              </div>
            </div>
          </div>
          <div style={{ height: "60vh" }} className="d-flex mt-5">
            <div className="card text-bg-primary m-3">
              <div className="card-body">
                <h5 className="card-title">Total Points Amount</h5>
                <p className="card-text">{userData.total_points}</p>
              </div>
            </div>
            <div className="card text-bg-secondary m-3">
              <div className="card-body">
                <h5 className="card-title">Total Views</h5>
                <p className="card-text">{userData.total_views}</p>
              </div>
            </div>
            <div className="card text-bg-success m-3">
              <div className="card-body">
                <h5 className="card-title">Unique Views</h5>
                <p className="card-text">{userData.unique_views}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          {userData.points_per_day && (
            <UserLineChart points={userData.points_per_day} />
          )}
        </div>
      </div>
    </>
  );
}

export default UserProfile;
