import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export default function DailyForm() {
  const dispatch = useDispatch();
  const [date, setDate] = useState();
  const [dailyWeight, setDailyWeight] = useState(0);

  const { username, daily } = useSelector((state) => state.user);

  const addDailyStats = async () => {
    console.log(
      "date: ",
      date,
      typeof date,
      " weight: ",
      typeof dailyWeight,
      dailyWeight
    );
    let sortedDaily = [...daily, { date: date, weight: +dailyWeight }].sort(
      (a, b) => {
        return (a.date - b.date) * -1;
      }
    );
    let updatedUser = {
      daily: sortedDaily,
    };
    const { data } = await axios.put("/api/user/update", {
      username: username,
      updatedUser,
    });
    console.log("data returned from put call: ", data);
    // dispatch({
    //     type: ""
    // })
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addDailyStats();
        }}
      >
        <input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <input
          type="number"
          value={dailyWeight}
          onChange={(e) => {
            setDailyWeight(e.target.value);
          }}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
