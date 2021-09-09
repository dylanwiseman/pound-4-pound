import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import LeaderBoard from "./LeaderBoard";
import axios from "axios";
import Login from "./Login";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import useToken from "./useToken";
import { useHistory } from "react-router";
import Logout from "./Logout";
import Signup from "./Signup";

export default function App() {
  const { token, setToken } = useToken();
  const [username, setUserName] = useState();
  const [currentWeight, setCurrentWeight] = useState();
  const [goalWeight, setGoalWeight] = useState();
  const [benchPR, setBenchPR] = useState();
  const [squatPR, setSquatPR] = useState();
  const [deadliftPR, setDeadliftPR] = useState();
  const [password, setPassword] = useState();

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
    // update the route to reroute user
    history.push(location);
    console.log(window.history);
    // set user stats:
    let { currentWeight, goalWeight, benchPR, squatPR, deadliftPR } =
      data.result;
    await setCurrentWeight(currentWeight);
    await setGoalWeight(goalWeight);
    await setBenchPR(benchPR);
    await setSquatPR(squatPR);
    await setDeadliftPR(deadliftPR);
    await console.log(currentWeight);
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
      <h1>Pound4Pound</h1>
      <h3>{username ? username : "no user"}</h3>
      <Link to="/home">Personal</Link>
      <Link to="/leaderboard">LeaderBoard</Link>
      <Logout />
      <Switch>
        <Route exact path="/home">
          <Home
            currentWeight={currentWeight}
            goalWeight={goalWeight}
            benchPR={benchPR}
            squatPR={squatPR}
            deadliftPR={deadliftPR}
          />
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
