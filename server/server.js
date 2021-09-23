const express = require("express");
const cors = require("cors");
// import cors from "cors";
// import express from "express";
// import postsRoute from "./routes/postsRoute.js";

const app = express();
const apiPort = 5000;

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

const postsRoute = require("./routes/postsRoute");
const commentsRoute = require("./routes/commentsRoute");
app.use("/comments", commentsRoute);
app.use("/posts", postsRoute);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
