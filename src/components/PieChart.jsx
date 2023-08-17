import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

function PieChartGraph({ data }) {
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#d0ed57", "#ff9e53"];

  return (
    <PieChart width={500} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        labelLine={false}
      >
        {data?.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend verticalAlign="bottom" />
    </PieChart>
  );
}

export default PieChartGraph;
