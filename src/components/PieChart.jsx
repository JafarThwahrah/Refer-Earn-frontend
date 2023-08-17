import React from "react";
import { PieChart } from "recharts";
import { Pie } from "recharts";
function PieChartGragh({ data }) {
  return (
    <PieChart width={1000} height={200}>
      <Pie
        className="pie_style"
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={50}
        fill="#8884d8"
      />
    </PieChart>
  );
}

export default PieChartGragh;
