import React from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "../../api/axios";
import PieChartGragh from "../../components/PieChart";
import "../../styles/styles.css";

function OverView() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        const accessToken = Cookies.get("accessToken");
        const response = await axios.get(`admin/get-overview`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          signal: abortController.signal,
        });
        setData(response.data.data);
      } catch (error) {
        console.log(error);
        if (!abortController.signal.aborted) {
        }
      }
    })();
    // Clean up the abort controller
    return () => {
      abortController.abort();
    };
  }, []);
  console.log(data);
  return (
    <div>
      <div className="d-flex justify-content-around">
        <div style={{ height: "50vh" }} className="d-flex mt-5">
          <div className="card text-bg-primary m-3">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text">{data.total_users}</p>
            </div>
          </div>
          <div className="card text-bg-secondary m-3">
            <div className="card-body">
              <h5 className="card-title">Total Points</h5>
              <p className="card-text">{data.total_points}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center flex-column align-items-center">
        <h4>Users per level</h4>

        <PieChartGragh data={data.users_count_per_level} />
      </div>
    </div>
  );
}

export default OverView;
