import React, { useState } from "react";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";

export default function Header({ username }) {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

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
          <MobileMenu setToggle={handleToggle} />
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

        {/* mobile menu: */}
        {toggle && (
          <div className="mobile-menu">
            <h3 className="welcome">
              Welcome, {username ? username : "no user"}
            </h3>
            <Link to="/home" className="navlink">
              Personal
            </Link>
            <Link to="/leaderboard" className="navlink">
              LeaderBoard
            </Link>
            <Logout />
          </div>
        )}
      </header>
    </div>
  );
}
//
