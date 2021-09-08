const express = require("express");
const database = require("./database/connection");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 4004;
database.connect();

app.use("/login", (req, res) => {
  res.send({
    token: "test123",
  });
});

app.get("/api", async (req, res) => {
  const result = await database.findOneUser("ArnoldS");
  console.log("yooooooo");
  res.send(result);
});

app.post("/api/auth/register", async (req, res) => {
  const {
    username,
    password,
    goalWeight,
    currentWeight,
    benchPR,
    squatPR,
    deadliftPR,
  } = req.body;
  const salt = bcrypt.genSaltSync(5);
  const passwordHash = bcrypt.hashSync(password, salt);

  let userObj = {
    username,
    passwordHash,
    goalWeight,
    currentWeight,
    benchPR,
    squatPR,
    deadliftPR,
  };
  const result = await database.createUser(userObj);
  let userToReturn = { ...userObj };
  userToReturn.passwordHash = undefined;
  res.send(userToReturn);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
