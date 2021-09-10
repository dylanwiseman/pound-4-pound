import React, { useState } from "react";

export default function Home({
  currentWeight,
  goalWeight,
  benchPR,
  squatPR,
  deadliftPR,
  updateUser,
}) {
  const [benchToggle, setBenchToggle] = useState(false);
  const [squatToggle, setSquatToggle] = useState(false);
  const [deadliftToggle, setDeadliftToggle] = useState(false);

  return (
    <div>
      <h2>
        current weight: {currentWeight} lbs / {goalWeight} lbs
      </h2>
      <div>
        <h3>Bench PR: {benchPR}</h3>
        <button
          onClick={() => {
            setBenchToggle(!benchToggle);
          }}
        >
          update
        </button>
        {benchToggle && (
          <form>
            <input type="text" value={benchPR} />
            <input type="submit" value="Update" />
          </form>
        )}
      </div>
      <h3>Squat PR: {squatPR}</h3>
      <h3>Deadlift PR: {deadliftPR}</h3>
    </div>
  );
}
