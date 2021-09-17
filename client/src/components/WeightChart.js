import React from "react";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { useSelector } from "react-redux";

export default function WeightChart() {
  //Using state from redux:
  const { daily, currentWeight, goalWeight } = useSelector(
    (state) => state.user
  );
  console.log("daily array from weightChart: ", daily);

  //creating two arrays that the graph uses to label ticks on the x-axis:
  const dateArray = !daily ? [] : daily.map((day) => day.date);
  const readableDateArray = !daily
    ? []
    : daily.map((day) => {
        day.date.setDate(day.date.getDate() + 1);
        return `${day.date.getMonth() + 1}/${day.date.getDate()}`;
      });
  console.log("the readable Array: ", readableDateArray);

  //This array is used to create the goalWeight line on the graph:
  const goalWeightLine = !daily
    ? []
    : daily.map((day) => {
        return { ...day, goalWeight: goalWeight };
      });

  return (
    <div className="chart-card">
      <div className="card-header">
        <h2>Body Weight</h2>
        <h4>weight by day</h4>
      </div>
      {!daily && (
        <div className="no-data-div">
          <h4>
            begin graphing your weight by adding a date and weight in the daily
            weight form. Your current weight will be updated accordingly.
            <br />
            <br /> PR goals are based on your body weight and current PR. For
            example, if you can bench 1.1x (110%) your body weight, your goal is
            set to 1.2x (120%), and so on. <br />
            <br /> To update a PR, click the new PR button. If you beat your
            goal, a new goal will be calculated.
          </h4>
        </div>
      )}
      {daily && (
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryAxis
            tickValues={[...dateArray]}
            tickFormat={[...readableDateArray]}
            style={{ tickLabels: { fontSize: 8, angle: 90 } }}
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
          <VictoryLine
            data={goalWeightLine}
            x="date"
            y="goalWeight"
            style={{
              data: { stroke: "#66999b", strokeWidth: 2, strokeDasharray: 4 },
            }}
          />
        </VictoryChart>
      )}
    </div>
  );
}
