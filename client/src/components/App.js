import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import LeaderBoard from "./LeaderBoard";
import axios from "axios";
import Login from "./Login";
import useToken from "./useToken";
import { useHistory } from "react-router";
// import Logout from "./Logout";
import Signup from "./Signup";
import { useDispatch } from "react-redux";
import "../app.css";
import Header from "./Header";

export default function App() {
  const { token, setToken } = useToken();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();

  //useHistory lets us push to the home page after logging in:
  let history = useHistory();
  const location = { pathname: "/home" };

  // This is the function to log a user in. First we'll send the login credentials to the database to check for the user and, if the password is correct, retrieve the user's data. We then put that data in the redux store so the rest of the app can use it.
  async function loginUser(username, password) {
    console.log("Loggin in: ", username);

    // need a username and password to be sent on body of the request:
    const credentials = { username: username, password: password };
    const { data } = await axios.post("/api/auth/login", credentials);

    // the data from the call includes an array called 'daily' that has dates (as strings) and weights. We need to turn those dates into date objects:
    const dateObjects = !data.result.daily
      ? null
      : data.result.daily.map((day) => {
          let newDate = new Date(day.date);
          return {
            date: newDate,
            weight: day.weight,
          };
        });

    //set the returned data from the call in the redux store, including the updated array of dates:
    dispatch({
      type: "SET_USER",
      value: { ...data.result, daily: dateObjects },
    });

    // update the route to reroute user
    history.push(location);

    return data;
  }

  if (!token) {
    return (
      <>
        <div className="center-header">
          <div className="big-header">
            <h1 className="no-padding">
              <span className="h1one">Pound</span>4
              <span className="h1two">Pound</span>
            </h1>
          </div>
        </div>
        <div className="login-container">
          <Login
            setToken={setToken}
            loginUser={loginUser}
            username={username}
            password={password}
            setUserName={setUserName}
            setPassword={setPassword}
          />
          <div>
            <h3 className="or">OR</h3>
          </div>
          <Signup
            loginUser={loginUser}
            setUserName={setUserName}
            setPassword={setPassword}
            setToken={setToken}
          />
        </div>
      </>
    );
  }

  return (
    <div className="App">
      <Header username={username} />
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/leaderboard">
          <LeaderBoard />
        </Route>
      </Switch>
    </div>
  );
}

{
  /* <header>
        <div className="left-header">
          <h1>
            <span className="h1one">Pound</span>4
            <span className="h1two">Pound</span>
          </h1>
          <h3 className="welcome">
            Welcome, {username ? username : "no user"}
          </h3>
        </div>
        <div className="right-header">
          <Link to="/home" className="navlink">
            Personal
          </Link>
          <Link to="/leaderboard" className="navlink">
            LeaderBoard
          </Link>
          <Logout />
        </div>
      </header> */
}
