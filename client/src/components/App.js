import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import LeaderBoard from "./LeaderBoard";
// import axios from "axios";
import Login from "./Login";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import useToken from "./useToken";

export default function App() {
  const { token, setToken } = useToken();
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

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="App">
      <h1>Pound4Pound</h1>
      <BrowserRouter>
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/leaderboard">
            <LeaderBoard />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

// const PrivateRoute = (props) => {
//   return <Route {...props}>{props.user ? props.children : <Login />}</Route>;
// };
// export default App;
