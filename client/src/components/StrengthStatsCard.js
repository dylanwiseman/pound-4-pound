import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DailyForm from "./DailyForm";
import NewPRForm from "./NewPRForm";
import ProgressContainer from "./ProgressContainer";
import axios from "axios";

export default function StrengthStatsCard({
  strengthRating,
  benchGoal,
  squatGoal,
  deadliftGoal,
}) {
  const dispatch = useDispatch();

  //getting state from redux:
  const { currentWeight, benchPR, squatPR, deadliftPR, username } = useSelector(
    (state) => state.user
  );

  //creating local state:
  const [benchToggle, setBenchToggle] = useState(false);
  const [squatToggle, setSquatToggle] = useState(false);
  const [deadliftToggle, setDeadliftToggle] = useState(false);
  const [newBench, setNewBench] = useState(+benchPR);
  const [newSquat, setNewSquat] = useState(+squatPR);
  const [newDeadlift, setNewDeadlift] = useState(+deadliftPR);

  //This function is used to update the PRs:
  async function updateUser(updatedUser) {
    //update it in the database:
    try {
      const { data } = await axios.put("/api/user/update", {
        username: username,
        updatedUser,
      });
      console.log("data returned from update user axios call: ", data);
    } catch (error) {
      console.log("error from update call: ", error.message);
    }

    //update in redux:
    dispatch({
      type: "UPDATE_USER",
      value: {
        benchPR: +newBench,
        squatPR: +newSquat,
        deadliftPR: +newDeadlift,
      },
    });

    // return data;
  }

  //handle changes in the inputs:
  const handleChangeBench = (e) => {
    setNewBench(e.target.value);
  };
  const handleChangeSquat = (e) => {
    setNewSquat(e.target.value);
  };
  const handleChangeDeadlift = (e) => {
    setNewDeadlift(e.target.value);
  };

  return (
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
        <div className="stat-div top">
          <h4>
            Bench PR: <span className="heavy">{benchPR}</span> lbs / goal:{" "}
            {Math.ceil(benchGoal)}
          </h4>
          <ProgressContainer
            exercisePR={benchPR}
            currentWeight={currentWeight}
            toggle={benchToggle}
            setToggle={setBenchToggle}
          />
          {!benchToggle && <div className="blank-div"></div>}
          {benchToggle && (
            <form
              className="new-pr-form"
              onSubmit={(e) => {
                e.preventDefault();
                let newBenchNum = +newBench;
                setNewBench(newBenchNum);
                updateUser({ benchPR: +newBench });
                setBenchToggle(!benchToggle);
              }}
            >
              <input
                type="text"
                value={newBench}
                onChange={handleChangeBench}
              />
              <input
                type="submit"
                value="Update"
                className="submit-daily-weight"
              />
            </form>
          )}
        </div>
        <div className="stat-div">
          <h4>
            Squat PR: <span className="heavy">{squatPR}</span> lbs / goal:{" "}
            {Math.ceil(squatGoal)}
          </h4>
          <ProgressContainer
            exercisePR={squatPR}
            currentWeight={currentWeight}
            toggle={squatToggle}
            setToggle={setSquatToggle}
          />
          {!squatToggle && <div className="blank-div"></div>}
          {squatToggle && (
            <form
              className="new-pr-form"
              onSubmit={(e) => {
                e.preventDefault();
                updateUser({ squatPR: +newSquat });
                setSquatToggle(!squatToggle);
              }}
            >
              <input
                type="text"
                value={newSquat}
                onChange={handleChangeSquat}
              />
              <input
                type="submit"
                value="Update"
                className="submit-daily-weight"
              />
            </form>
          )}
        </div>
        <div className="stat-div">
          <h4>
            Deadlift PR: <span className="heavy">{deadliftPR}</span> lbs / goal:{" "}
            {Math.ceil(deadliftGoal)}
          </h4>
          <ProgressContainer
            exercisePR={deadliftPR}
            currentWeight={currentWeight}
            toggle={deadliftToggle}
            setToggle={setDeadliftToggle}
          />
          {!deadliftToggle && <div className="blank-div"></div>}
          {deadliftToggle && (
            <form
              className="new-pr-form"
              onSubmit={(e) => {
                e.preventDefault();
                updateUser({ deadliftPR: +newDeadlift });
                setDeadliftToggle(!deadliftToggle);
              }}
            >
              <input
                type="text"
                value={newDeadlift}
                onChange={handleChangeDeadlift}
              />
              <input
                type="submit"
                value="Update"
                className="submit-daily-weight"
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
