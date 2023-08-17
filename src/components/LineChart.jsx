import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const UserLineChart = ({ points }) => {
  const chartData = points.map(({ date, total_points }) => ({
    name: date,
    uv: parseInt(total_points),
  }));

  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-end line_chart_container">
        <h4>Points Per Day</h4>
        <ResponsiveContainer width="75%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default UserLineChart;
