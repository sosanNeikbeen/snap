const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const passport = require("passport");
const jwtStrategy = require("./passport.js");

const app = express();
const apiPort = 5000;
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", require("./routes/index"));

mongoose
  .connect(process.env.MONGO_URL || "mongodb://localhost/social_media")
  .then(() =>
    console.log(`MongoDB Connected and server running on port:  ${apiPort}`)
  )
  .catch((err) => console.log(err.message));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));

passport.use("jwt", jwtStrategy);
app.use(passport.initialize());
