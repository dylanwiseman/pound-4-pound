import React from "react";
import Logout from "./Logout";
import { Link } from "react-router-dom";

export default function Header({ username }) {
  return (
    <div>
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
    </div>
  );
}
