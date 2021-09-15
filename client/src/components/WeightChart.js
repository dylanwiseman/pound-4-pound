import React, { useEffect, useState } from "react";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { useSelector } from "react-redux";

export default function WeightChart() {
  const { daily, currentWeight } = useSelector((state) => state.user);
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
        <h4>weight by day</h4>
      </div>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryAxis
          tickValues={[...dateArray]}
          tickFormat={[...readableDateArray]}
        />
        <VictoryAxis
          dependentAxis
          tickValues={[
            currentWeight - 20,
            currentWeight - 10,
            currentWeight,
            currentWeight + 10,
            currentWeight + 20,
          ]}
        />
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
