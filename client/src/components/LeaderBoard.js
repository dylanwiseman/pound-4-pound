import axios from "axios";
import React, { useEffect, useState } from "react";

export default function LeaderBoard() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getLeaderboard = async () => {
      const { data } = await axios.get("/api/leaderboard");
      setIsLoading(false);

      const leaders = data.map((user) => {
        let strengthRating = Math.ceil(
          ((parseInt(user.benchPR) +
            parseInt(user.squatPR) +
            parseInt(user.deadliftPR)) /
            3 /
            parseInt(user.currentWeight)) *
            100
        );
        return { ...user, strengthRating };
      });
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
    <div>
      Leaderboard
      <ol>
        {userData.map((user, index) => {
          return (
            <li key={index}>
              {user.username} , {user.strengthRating}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
