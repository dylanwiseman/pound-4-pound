import React from "react";

export default function NewPRForm({
  newExercise,
  setNewExercise,
  updateUser,
  updateUserObject,
  toggle,
  setToggle,
}) {
  const handleChangeExercise = (e) => {
    setNewExercise(e.target.value);
  };

  return (
    <div>
      <form
        className="new-pr-form"
        onSubmit={(e) => {
          e.preventDefault();
          let newExerciseNum = +newExercise;
          setNewExercise(newExerciseNum);
          updateUser({ benchPR: +newExercise });
          setToggle(!toggle);
        }}
      >
        <input
          type="text"
          value={newExercise}
          onChange={handleChangeExercise}
        />
        <input type="submit" value="Update" className="submit-daily-weight" />
      </form>
    </div>
  );
}
