import axios from "axios";
import React, { useEffect, useState } from "react";

export default function LeaderBoard() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getLeaderboard = async () => {
      const { data } = await axios.get("/api/leaderboard");
      setUserData(data);
      setIsLoading(false);
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
          return <li key={index}>{user.username}</li>;
        })}
      </ol>
    </div>
  );
}
