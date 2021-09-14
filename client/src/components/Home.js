import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export default function Home() {
  useSelector((state) => console.log(state));
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
        10000
    );
    setStrengthRating(strengthRating);
  }, [currentWeight, benchPR, squatPR, deadliftPR]);

  return (
    <div className="container">
      <div className="stats-card">
        <div className="card-header">
          <h2>Strength Stats</h2>
          <h3>
            <span className="lvl">lvl:</span> {strengthRating}
          </h3>
        </div>
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
            New PR
          </button>
          {benchToggle && (
            <form
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
          <h3>Squat PR: {squatPR}</h3>
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
          <h3>Deadlift PR: {deadliftPR}</h3>
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
  );
}
