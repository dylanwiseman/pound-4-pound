import React from "react";
import DailyForm from "./DailyForm";

export default function DailyInput() {
  return (
    <div id="daily-card">
      <div className="card-header">
        <h2>Daily Inputs</h2>
      </div>
      <DailyForm />
    </div>
  );
}
