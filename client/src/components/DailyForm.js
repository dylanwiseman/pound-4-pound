import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export default function DailyForm() {
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [dailyWeight, setDailyWeight] = useState(0);

  const { username, daily } = useSelector((state) => state.user);

  const addDailyStats = async () => {
    console.log(
      "date input to add: ",
      date,
      typeof date,
      " weight input to add: ",
      typeof dailyWeight,
      dailyWeight
    );
    let unixDaily = [...daily, { date: date, weight: +dailyWeight }].map(
      (day) => {
        return { date: new Date(day.date).getTime(), weight: day.weight };
      }
    );
    console.log("unix array of dates: ", unixDaily);
    let sortedDaily = unixDaily
      .sort((a, b) => {
        return a.date - b.date;
      })
      .map((day) => {
        return { date: new Date(day.date), weight: day.weight };
      });
    console.log(
      "sorted array of dates:",
      sortedDaily,
      "last item in array: ",
      sortedDaily[sortedDaily.length - 1]
    );

    let updatedUser = {
      daily: sortedDaily,
      currentWeight: sortedDaily[sortedDaily.length - 1].weight,
    };
    console.log("updatedUser being sent to call: ", updatedUser);
    const { data } = await axios.put("/api/user/update", {
      username: username,
      updatedUser,
    });
    console.log("data returned from put call: ", data);
    console.log("sortedDaily after the call is sent: ", sortedDaily);
    await dispatch({
      type: "UPDATE_USER",
      value: {
        daily: sortedDaily,
        currentWeight: sortedDaily[sortedDaily.length - 1].weight,
      },
    });
    console.log("daily after the dispatch: ", daily);
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
