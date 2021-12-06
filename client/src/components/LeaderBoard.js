import axios from "axios";
import React, { useEffect, useState } from "react";
// import "../leaderboard.css";

export default function LeaderBoard() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //makes an axios request to get the user data for the leaderboard:
    const getLeaderboard = async () => {
      const { data } = await axios.get("/api/leaderboard");

      //gets the strength rating for each user and puts it in an array:
      const leaders = data.map((user) => {
        let strengthRating = Math.ceil(
          ((parseInt(user.benchPR) +
            parseInt(user.squatPR) +
            parseInt(user.deadliftPR)) /
            3 /
            parseInt(user.currentWeight)) *
            100
        );
        setIsLoading(false);
        return { ...user, strengthRating };
      });

      //sorts the array by strength rating and sets it to the UserData state:
      leaders.sort((a, b) => {
        return (a.strengthRating - b.strengthRating) * -1;
      });
      setUserData(leaders);
    };
    try {
      getLeaderboard();
    } catch (error) {
      alert(error);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-card">
        <div className="leaderboard-header">
          <h2>Leaderboard</h2>
        </div>
        <ol className="leader-list">
          {userData.map((user, index) => {
            return (
              <li key={index}>
                {index + 1}.<h3 className="leader-name">{user.username}</h3>
                <h4 className="lvl-small">lvl: </h4>
                <h3 className="leader-level">{user.strengthRating}</h3>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
