// import express from "express";
// import db from "../db";
// import mongodb from "mongodb";

const express = require("express");
const db = require("../db");
const mongodb = require("mongodb");
const ObjectID = require("mongodb").ObjectID;

const router = express.Router();

// /* GET posts listing. */
// router.get("/", async (req, res, next) => {
//   // Step:1--get databse
//   const database = await db();
//   //Step:2-- get collection
//   const collection = database.collection("streams");

//   const streams = await collection.find().toArray();
//   res.status(200).json({
//     streams: streams,
//   });
// });

// router.get("/:id", async (req, res, next) => {
//   // Step:1--get databse
//   const database = await db();
//   //Step:2-- get collection
//   const collection = database.collection("streams");

//   try {
//     const stream = await collection.findOne({
//       _id: mongodb.ObjectId(req.params.id),
//     });

//     res.status(200).json({
//       stream: stream,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.post("/", async (req, res, next) => {
//   // Step 1: get data from req object
//   const data = {
//     title: req.body.title,
//     description: req.body.description,
//     userId: req.body.userId,
//   };

//   // Step 2: Connect to mongodb
//   const database = await db();
//   const collection = database.collection("streams");

//   const result = await collection.insert(data);
//   console.log(result);
//   res.redirect("/");
//   res.status(200).json({
//     message: "stream created",
//   });
// });

// router.put("/edit/:id", async (req, res, next) => {
//   // Step 1: get data from req object
//   const data = {
//     title: req.body.title,
//     description: req.body.description,
//     userId: req.body.userId,
//   };

//   // Step 2: Connect to mongodb
//   const database = await db();
//   const collection = database.collection("streams");

//   const result = await collection.updateOne(
//     { _id: mongodb.ObjectId(req.params.id) },
//     data
//   );
//   console.log(result);
//   res.status(200).json({
//     message: "stream edited",
//   });
// });

module.exports = router;
// export default router;