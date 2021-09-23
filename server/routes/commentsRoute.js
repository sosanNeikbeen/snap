const express = require("express");
const db = require("../db");
const mongodb = require("mongodb");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const database = await db();
  const collection = database.collection("comments");

  const comments = await collection.find().toArray();
  res.status(200).json({
    comments: comments,
  });
});

router.get("/:id", async (req, res, next) => {
  // Step:1--get databse
  const database = await db();
  //Step:2-- get collection
  const collection = database.collection("comments");

  try {
    const comment = await collection.findOne({
      _id: mongodb.ObjectId(req.params.id),
    });

    res.status(200).json({
      comment: comment,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  // Step 1: get data from req object
  let date = new Date();
  const data = {
    comment: req.body.comment,
    created_at: date,
    postId: req.body.postId,
    // userId: req.body.userId,
  };
  // Step 2: Connect to mongodb
  const database = await db();
  const collection = database.collection("comments");

  const result = await collection.insertOne(data);
  console.log(result);
  res.status(200).json({
    message: "comment created",
  });
});

router.delete("/delete/:id", async (req, res) => {
  // Step:1--get databse
  const database = await db();
  //Step:2-- get collection
  const collection = database.collection("comments");
  try {
    const deleteComment = await collection.remove({
      _id: mongodb.ObjectId(req.params.id),
    });
    res.status(200).json({
      comment: deleteComment,
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/edit/:id", async (req, res, next) => {
  // Step 1: get data from req object
  const data = {
    comment: req.body.comment,
  };
  // Step 2: Connect to mongodb
  const database = await db();
  const collection = database.collection("comments");

  try {
    await collection.updateOne(
      { _id: mongodb.ObjectId(req.params.id) },
      { $set: data },
      { upsert: true }
    );

    res.status(200).json({
      message: "comment edited",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
