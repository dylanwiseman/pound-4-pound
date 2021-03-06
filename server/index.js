const express = require("express");
const database = require("./database/connection");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.static("public"));

//For Heroku:
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/public/index.html"));
// });
app.use(express.static(path.resolve(__dirname, "../client/build")));

//Setup server port and connect to database:
const PORT = process.env.PORT || 4004;
database.connect();

// UPDATE user stats:
app.put("/api/user/update", async (req, res) => {
  const result = await database.updateUser(
    req.body.username,
    req.body.updatedUser
  );
  res.send("result");
});

// GET LEADERBOARD:
app.get("/api/leaderboard", async (req, res) => {
  const result = await database.findUsers();
  console.log("inside server app.get leaderboard: ", result);
  res.send(result);
});

// LOGIN:
app.post("/api/auth/login", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  //calls the READ function defined in connection.js:
  const result = await database.findOneUser(username);

  //compare the password with the saved hash:
  if (result && bcrypt.compareSync(password, result.passwordHash)) {
    res.send({
      token: "test123",
      result: result,
    });
  } else {
    res.status(401).send({ message: "incorrect password" });
  }
});

// REGISTER a new user:
app.post("/api/auth/register", async (req, res) => {
  const {
    newUsername,
    newPassword,
    goalWeightNum,
    currentWeightNum,
    benchPRNum,
    squatPRNum,
    deadliftPRNum,
  } = req.body;
  //save a hash of the password instead of the password itself
  const salt = bcrypt.genSaltSync(5);
  const passwordHash = bcrypt.hashSync(newPassword, salt);

  // define the object to send to the database
  let userObj = {
    username: newUsername,
    passwordHash,
    goalWeight: goalWeightNum,
    currentWeight: currentWeightNum,
    benchPR: benchPRNum,
    squatPR: squatPRNum,
    deadliftPR: deadliftPRNum,
  };
  // call the CREATE function defined in connection.js:
  const result = await database.createUser(userObj);
  console.log(result);
  let userToReturn = { ...userObj };
  userToReturn.passwordHash = undefined;
  console.log(userToReturn);
  //send back a token (stored in sessionStorage to stay logged in) and the created user to access their data
  res.send({ token: "test123", userToReturn, result });
});
// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
