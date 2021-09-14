import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import LeaderBoard from "./LeaderBoard";
import axios from "axios";
import Login from "./Login";
import useToken from "./useToken";
import { useHistory } from "react-router";
import Logout from "./Logout";
import Signup from "./Signup";
import { useDispatch } from "react-redux";
import "../app.css";

export default function App() {
  const { token, setToken } = useToken();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();

  //useHistory lets us push to the home page after logging in:
  let history = useHistory();
  const location = { pathname: "/home" };

  async function loginUser(username, password) {
    console.log("Loggin in: ", username, password);
    // need a username and password to be sent on body
    const credentials = { username: username, password: password };
    const { data } = await axios.post(
      "http://localhost:4004/api/auth/login",
      credentials
    );
    console.log(data.result);
    dispatch({ type: "SET_USER", value: data.result });
    // update the route to reroute user
    history.push(location);
    console.log(window.history);
    // set user stats:
    // let { currentWeight, goalWeight, benchPR, squatPR, deadliftPR } =
    //   data.result;
    // await setCurrentWeight(currentWeight);
    // await setGoalWeight(goalWeight);
    // await setBenchPR(benchPR);
    // await setSquatPR(squatPR);
    // await setDeadliftPR(deadliftPR);
    // await console.log(currentWeight);
    // set auth token:
    console.log(data);
    return data;
  }

  if (!token) {
    return (
      <>
        <Login
          setToken={setToken}
          loginUser={loginUser}
          username={username}
          password={password}
          setUserName={setUserName}
          setPassword={setPassword}
        />
        <Signup
          loginUser={loginUser}
          setUserName={setUserName}
          setPassword={setPassword}
          setToken={setToken}
        />
      </>
    );
  }

  return (
    <div className="App">
      <header>
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
      </header>
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

// setCurrenWeight={setCurrentWeight}
//           setGoalWeight={setGoalWeight}
//           setBenchPR={setBenchPR}
//           setSquatPR={setSquatPR}
//           setDeadliftPR={setDeadliftPR}

// const PrivateRoute = (props) => {
//   return <Route {...props}>{props.user ? props.children : <Login />}</Route>;
// };
// export default App;

// const [user, setUser] = useState(undefined);

// const observeAuth = () => {
//   const auth = getAuth();
//   onAuthStateChanged(auth, (user) => {
//     console.log("the user is being set ", user);
//     setUser(user);
//   });
// };

// useEffect(() => {
//   try {
//     observeAuth();
//   } catch (error) {
//     console.log(error);
//   }
// }, []);
