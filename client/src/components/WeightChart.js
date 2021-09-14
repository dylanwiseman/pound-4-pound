import React, { useEffect, useState } from "react";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { useSelector } from "react-redux";
import DailyForm from "./DailyForm";

export default function WeightChart() {
  const { daily } = useSelector((state) => state.user);
  console.log(daily);

  // useEffect(() => {
  //   const dateArray = !daily
  //     ? [1, 2, 3]
  //     : daily.map((day) => day.date.substr(5, 5));
  //   return dateArray;
  // }, [daily]);

  if (!daily) return <div>load data</div>;

  return (
    <div className="chart-card">
      <div className="card-header">
        <h2>Body Weight</h2>
      </div>
      <DailyForm />
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryAxis tickValues={[...daily]} />
        <VictoryAxis dependentAxis />
        <VictoryLine data={daily} x="date" y="weight" />
      </VictoryChart>
    </div>
  );
}

// tickFormat={[...dateArray]}
