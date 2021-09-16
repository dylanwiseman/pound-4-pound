import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export default function DailyForm() {
  const dispatch = useDispatch();
  const [date, setDate] = useState(null);
  const [dailyWeight, setDailyWeight] = useState(0);

  const { username, daily } = useSelector((state) => state.user);

  const addDailyStats = async () => {
    console.log(
      "date input to add: ",
      date,
      typeof date,
      " weight input to add: ",
      typeof dailyWeight,
      dailyWeight,
      "daily array: ",
      daily
    );

    let newDate = new Date(new Date(date).getTime() + 86400000);
    setDate(newDate);
    let sortedDaily = [];
    if (daily) {
      let unixDaily = [...daily, { date: date, weight: +dailyWeight }].map(
        (day) => {
          return { date: new Date(day.date).getTime(), weight: day.weight };
        }
      );
      console.log("unix array of dates: ", unixDaily);
      sortedDaily = unixDaily
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
    } else {
      sortedDaily = [{ date: new Date(date), weight: +dailyWeight }];
    }

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
    <div className="daily-form">
      <h4>Update your daily weight:</h4>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addDailyStats();
        }}
      >
        <label htmlFor="date">Date: </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <label htmlFor="weight">Weight: </label>
        <input
          id="weight"
          type="number"
          value={dailyWeight}
          onChange={(e) => {
            setDailyWeight(e.target.value);
          }}
        />
        <input type="submit" className="submit-daily-weight" />
      </form>
    </div>
  );
}
