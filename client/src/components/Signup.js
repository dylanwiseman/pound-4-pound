import React, { useState } from "react";
import axios from "axios";

export default function Signup({
  loginUser,
  setUserName,
  setPassword,
  setToken,
}) {
  //This state is used just to create the new user, it's different from the state used in App or by Redux:
  const [newUsername, setNewUserName] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [benchPR, setBenchPR] = useState("");
  const [squatPR, setSquatPR] = useState("");
  const [deadliftPR, setDeadliftPR] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  async function register() {
    if (newPassword !== passwordConfirm) {
      alert("Passwords do not match");
      return;
    }
    console.log("registering new user...");

    // the states are strings, we have to turn them into numbers before we send them to the database:
    let currentWeightNum = parseInt(currentWeight);
    let goalWeightNum = parseInt(goalWeight);
    let benchPRNum = parseInt(benchPR);
    let squatPRNum = parseInt(squatPR);
    let deadliftPRNum = parseInt(deadliftPR);

    //making a post request to add the user:
    const { data } = await axios.post("/api/auth/register", {
      newUsername,
      newPassword,
      currentWeightNum,
      goalWeightNum,
      benchPRNum,
      squatPRNum,
      deadliftPRNum,
    });
    console.log(
      "sending data to axios.post/register: ",
      newUsername,
      currentWeight,
      goalWeight,
      benchPR,
      squatPR,
      deadliftPR
    );
    // console.log("data returned from axios.post to register user: ", data);
  }

  //Calls register() and sets state for username and password that we will use to login:
  const handleSubmit = async (e) => {
    e.preventDefault();
    await register();
    await setUserName(newUsername);
    await setPassword(newPassword);

    //call loginUser() with the username and password we just created and set the token:
    const token = await loginUser(newUsername, newPassword);
    setToken(token);
  };

  return (
    <div className="login-card">
      <div className="signup-header">
        <h2>Sign up:</h2>
      </div>
      <form onSubmit={handleSubmit} className="signup-form">
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            value={newUsername}
            onChange={(e) => {
              setNewUserName(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="passwordConfirm">Re-enter Password: </label>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="currentWeight">Current Body Weight: </label>
          <input
            type="text"
            value={currentWeight}
            onChange={(e) => {
              setCurrentWeight(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="goalWeight">Goal Body Weight: </label>
          <input
            type="text"
            value={goalWeight}
            onChange={(e) => {
              setGoalWeight(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="benchPR">Bench PR: </label>
          <input
            type="text"
            value={benchPR}
            onChange={(e) => {
              setBenchPR(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="squatPR">Squat PR: </label>
          <input
            type="text"
            value={squatPR}
            onChange={(e) => {
              setSquatPR(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="deadliftPR">Deadlift PR: </label>
          <input
            type="text"
            value={deadliftPR}
            onChange={(e) => {
              setDeadliftPR(e.target.value);
            }}
            required
          />
        </div>
        <input type="submit" className="signup-button" />
      </form>
    </div>
  );
}
