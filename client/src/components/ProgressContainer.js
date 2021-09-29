import React from "react";

export default function ProgressContainer({
  exercisePR,
  currentWeight,
  setToggle,
  toggle,
}) {
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div
          className="current-progress"
          style={{
            width: `${(exercisePR / (currentWeight * 2)) * 100}%`,
          }}
        >
          <p>{(exercisePR / currentWeight).toFixed(2)}x</p>
        </div>
      </div>
      <p>2x</p>
      <button
        className="new-pr-button"
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        New PR
      </button>
    </div>
  );
}
