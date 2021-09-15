import React, { useEffect, useState } from "react";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { useSelector } from "react-redux";
import DailyForm from "./DailyForm";

export default function WeightChart() {
  const { daily } = useSelector((state) => state.user);
  console.log("daily array from weightChart: ", daily);
  if (!daily) return <div>load data</div>;

  const dateArray = daily.map((day) => day.date);

  const readableDateArray = !daily
    ? [1, 2, 3]
    : daily.map((day) => `${day.date.getMonth() + 1}/${day.date.getDate()}`);

  return (
    <div className="chart-card">
      <div className="card-header">
        <h2>Body Weight</h2>
      </div>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryAxis
          tickValues={[...dateArray]}
          tickFormat={[...readableDateArray]}
        />
        <VictoryAxis dependentAxis tickValues={[0, 50, 100, 150, 200, 250]} />
        <VictoryLine
          data={daily}
          x="date"
          y="weight"
          style={{
            data: { stroke: "#e71d36" },
            parent: { border: "1px solid #66999b" },
          }}
        />
      </VictoryChart>
    </div>
  );
}

// tickFormat={[...dateArray]}
