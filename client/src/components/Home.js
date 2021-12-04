import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import WeightChart from "./WeightChart";
import StrengthStatsCard from "./StrengthStatsCard";

export default function Home() {
  //getting state from redux:
  const { currentWeight, benchPR, squatPR, deadliftPR } = useSelector(
    (state) => state.user
  );

  //creating local state:
  const [strengthRating, setStrengthRating] = useState(0);
  const [benchGoal, setBenchGoal] = useState(currentWeight);
  const [squatGoal, setSquatGoal] = useState(currentWeight);
  const [deadliftGoal, setDeadliftGoal] = useState(currentWeight);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //creates strength rating:
    let strengthRating = Math.ceil(
      ((parseInt(benchPR) + parseInt(squatPR) + parseInt(deadliftPR)) /
        3 /
        parseInt(currentWeight)) *
        100
    );
    setStrengthRating(strengthRating);

    //these multiplyers are used to set the next PR goals automatically, based on weight and current pr:
    const benchMultiplyer =
      Math.floor((benchPR / currentWeight) * 10) / 10 + 0.1;
    const squatMultiplyer =
      Math.floor((squatPR / currentWeight) * 10) / 10 + 0.1;
    const deadliftMultiplyer =
      Math.floor((deadliftPR / currentWeight) * 10) / 10 + 0.1;

    setBenchGoal(benchMultiplyer * currentWeight);
    setSquatGoal(squatMultiplyer * currentWeight);
    setDeadliftGoal(deadliftMultiplyer * currentWeight);
    setIsLoading(false);
  }, [currentWeight, benchPR, squatPR, deadliftPR]);

  return (
    <>
      {!isLoading && (
        <main className="container">
          <StrengthStatsCard
            strengthRating={strengthRating}
            benchGoal={benchGoal}
            squatGoal={squatGoal}
            deadliftGoal={deadliftGoal}
          />
          <WeightChart />
        </main>
      )}
    </>
  );
}
