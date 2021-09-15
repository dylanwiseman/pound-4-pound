import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import WeightChart from "./WeightChart";
import DailyForm from "./DailyForm";
import { current } from "immer";

export default function Home() {
  // useSelector((state) => console.log(state));
  const dispatch = useDispatch();

  const { currentWeight, goalWeight, benchPR, squatPR, deadliftPR, username } =
    useSelector((state) => state.user);

  const [benchToggle, setBenchToggle] = useState(false);
  const [squatToggle, setSquatToggle] = useState(false);
  const [deadliftToggle, setDeadliftToggle] = useState(false);
  const [newBench, setNewBench] = useState(+benchPR);
  const [newSquat, setNewSquat] = useState(+squatPR);
  const [newDeadlift, setNewDeadlift] = useState(+deadliftPR);
  const [strengthRating, setStrengthRating] = useState(0);
  const [benchGoal, setBenchGoal] = useState(currentWeight);

  async function updateUser(updatedUser) {
    console.log(
      "updating user from Homepage: ",
      username,
      "sending: ",
      updatedUser
    );
    const { data } = await axios.put("/api/user/update", {
      username: username,
      updatedUser,
    });
    console.log(data);
    dispatch({
      type: "UPDATE_USER",
      value: {
        benchPR: +newBench,
        squatPR: +newSquat,
        deadliftPR: +newDeadlift,
      },
    });

    return data;
  }

  const handleChangeBench = (e) => {
    setNewBench(e.target.value);
  };
  const handleChangeSquat = (e) => {
    setNewSquat(e.target.value);
  };
  const handleChangeDeadlift = (e) => {
    setNewDeadlift(e.target.value);
  };

  useEffect(() => {
    let strengthRating = Math.ceil(
      ((parseInt(benchPR) + parseInt(squatPR) + parseInt(deadliftPR)) /
        3 /
        parseInt(currentWeight)) *
        100
    );
    setStrengthRating(strengthRating);
    if (benchPR >= 1.6 * currentWeight) {
      setBenchGoal(currentWeight * 1.7);
    } else if (benchPR >= 1.5 * currentWeight) {
      setBenchGoal(currentWeight * 1.6);
    } else if (benchPR >= 1.4 * currentWeight) {
      setBenchGoal(currentWeight * 1.5);
    } else if (benchPR >= 1.3 * currentWeight) {
      setBenchGoal(currentWeight * 1.4);
    } else if (benchPR >= 1.2 * currentWeight) {
      setBenchGoal(currentWeight * 1.3);
    } else if (benchPR >= 1.1 * currentWeight) {
      setBenchGoal(currentWeight * 1.2);
    } else if (benchPR >= 1.0 * currentWeight) {
      setBenchGoal(currentWeight * 1.1);
    } else if (benchPR < currentWeight) {
      setBenchGoal(currentWeight);
    } else {
      setBenchGoal(currentWeight * 2);
    }
  }, [currentWeight, benchPR, squatPR, deadliftPR]);

  return (
    <div className="container">
      <div className="stats-card">
        <div className="card-header">
          <h2>Strength Stats</h2>
          <h3>
            <span className="lvl">lvl:</span>{" "}
            <span className="ratingColor">{strengthRating}</span>
          </h3>
        </div>
        <div className="inner-stats-container">
          <h4>
            current weight: <span className="heavy">{currentWeight}</span> lbs
          </h4>
          <DailyForm />
          <div>
            <h4>
              Bench PR: <span className="heavy">{benchPR}</span> lbs / goal:{" "}
              {Math.ceil(benchGoal)}
            </h4>
            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className="current-progress"
                  style={{ width: `${(benchPR / (currentWeight * 2)) * 100}%` }}
                >
                  <p>{(benchPR / currentWeight).toFixed(2)}x</p>
                </div>
              </div>
              <p>2x</p>
              <button
                className="new-pr-button"
                onClick={() => {
                  setBenchToggle(!benchToggle);
                }}
              >
                New PR
              </button>
            </div>
            {benchToggle && (
              <form
                className="new-pr-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  let newBenchNum = +newBench;
                  console.log(
                    "type of newbenchnum: ",
                    typeof newBenchNum,
                    newBenchNum
                  );
                  setNewBench(newBenchNum);
                  console.log("type of newbench: ", typeof newBench, newBench);
                  updateUser({ benchPR: +newBench });
                  setBenchToggle(!benchToggle);
                }}
              >
                <input
                  type="text"
                  value={newBench}
                  onChange={handleChangeBench}
                />
                <input type="submit" value="Update" />
              </form>
            )}
          </div>
          <div>
            <h4>
              Squat PR: <span className="heavy">{squatPR}</span> lbs
            </h4>
            <button
              onClick={() => {
                setSquatToggle(!squatToggle);
              }}
            >
              New PR
            </button>
            {squatToggle && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateUser({ squatPR: newSquat });
                  setSquatToggle(!squatToggle);
                }}
              >
                <input
                  type="text"
                  value={newSquat}
                  onChange={handleChangeSquat}
                />
                <input type="submit" value="Update" />
              </form>
            )}
          </div>
          <div>
            <h4>
              Deadlift PR: <span className="heavy">{deadliftPR}</span> lbs
            </h4>
            <button
              onClick={() => {
                setDeadliftToggle(!deadliftToggle);
              }}
            >
              New PR
            </button>
            {deadliftToggle && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateUser({ deadliftPR: newDeadlift });
                  setDeadliftToggle(!deadliftToggle);
                }}
              >
                <input
                  type="text"
                  value={newDeadlift}
                  onChange={handleChangeDeadlift}
                />
                <input type="submit" value="Update" />
              </form>
            )}
          </div>
        </div>
      </div>
      <WeightChart />
    </div>
  );
}
