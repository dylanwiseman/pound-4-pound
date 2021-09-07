const express = require("express");
const database = require("./connection");
const cors = require("cors");
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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
