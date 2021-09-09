import React from "react";

export default function Home({
  currentWeight,
  goalWeight,
  benchPR,
  squatPR,
  deadliftPR,
}) {
  return (
    <div>
      <h2>
        current weight: {currentWeight} lbs / {goalWeight} lbs
      </h2>
      <h3>Bench PR: {benchPR}</h3>
      <h3>Squat PR: {squatPR}</h3>
      <h3>Deadlift PR: {deadliftPR}</h3>
    </div>
  );
}
