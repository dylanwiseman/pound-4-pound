import React, { useEffect, useState } from "react";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { useSelector } from "react-redux";
import DailyForm from "./DailyForm";

export default function WeightChart() {
  const { daily } = useSelector((state) => state.user);
  console.log(daily);

  const dateArray = daily.map((day) => day.date);

  const readableDateArray = !daily
    ? [1, 2, 3]
    : daily.map((day) => day.date.substr(5, 5));

  if (!daily) return <div>load data</div>;

  return (
    <div className="chart-card">
      <div className="card-header">
        <h2>Body Weight</h2>
      </div>
      <DailyForm />
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryAxis
          tickValues={[...dateArray]}
          tickFormat={[...readableDateArray]}
          // tickValues={[
          //   1630510470000, 1633102470000, 1635780870000, 1638376470000,
          // ]}
          // tickFormat={["Sep", "Oct", "Nov", "Dec"]}
        />
        <VictoryAxis dependentAxis tickValues={[0, 50, 100, 150, 200, 250]} />
        <VictoryLine data={daily} x="date" y="weight" />
      </VictoryChart>
    </div>
  );
}

// tickFormat={[...dateArray]}
