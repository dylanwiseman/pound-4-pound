import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export default function DailyForm() {
  //using dispatch and setting local state:
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [dailyWeight, setDailyWeight] = useState(0);

  //getting state from redux:
  const { username, daily } = useSelector((state) => state.user);

  //adds the new day's data to the array and sorts the array by day:
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

    //adds the new day and translates all the dates to unix so we can sort them IF you already have data in the array:
    let sortedDaily = [];
    let newDate = new Date(date);
    let dayPlusOne = newDate.setDate(newDate.getDate() + 1);
    let newDate2 = new Date(dayPlusOne);
    if (daily) {
      let unixDaily = [...daily, { date: newDate2, weight: +dailyWeight }].map(
        (day) => {
          return { date: new Date(day.date).getTime(), weight: day.weight };
        }
      );
      console.log("unix array of dates: ", unixDaily);

      //turns the dates back into date objects:
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
      //if you don't have any dates recorded yet, this starts that array, since there's nothing to sort yet:
      sortedDaily = [{ date: newDate2, weight: +dailyWeight }];
    }

    //finds the most recent date in your array of dates and creates the updatedUser to update your user with the new array and new current weight:
    let updatedUser = {
      daily: sortedDaily,
      currentWeight: sortedDaily[sortedDaily.length - 1].weight,
    };
    console.log("updatedUser being sent to call: ", updatedUser);

    //makes the axios call to update the user in the database:
    const { data } = await axios.put("/api/user/update", {
      username: username,
      updatedUser,
    });
    console.log("data returned from put call: ", data);
    console.log("sortedDaily after the call is sent: ", sortedDaily);

    //update the user in redux:
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
