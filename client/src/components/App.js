import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import LeaderBoard from "./LeaderBoard";
import Login from "./Login";
import useToken from "../useToken";

function App() {
  const { token, setToken } = useToken();

  // const [userData, setUserData] = useState({});

  // useEffect(() => {
  //   async function getUser() {
  //     const { data } = await axios.get("/api");
  //     setUserData(data);
  //   }
  //   try {
  //     getUser();
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
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/leaderboard">
            <LeaderBoard />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
