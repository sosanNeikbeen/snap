// import express from "express";
// import db from "../db";
// import mongodb from "mongodb";

const express = require("express");
const db = require("../db");
const mongodb = require("mongodb");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const database = await db();
  const collection = database.collection("posts");

  const posts = await collection.find().toArray();
  res.status(200).json({
    posts: posts,
  });
});

router.get("/:id", async (req, res, next) => {
  // Step:1--get databse
  const database = await db();
  //Step:2-- get collection
  const collection = database.collection("posts");

  try {
    const post = await collection.findOne({
      _id: mongodb.ObjectId(req.params.id),
    });

    res.status(200).json({
      post: post,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  // Step 1: get data from req object
  let date = new Date();
  const data = {
    post: req.body.post,
    image: req.body.image,
    created_at: date,
    // userId: req.body.userId,
  };
  // Step 2: Connect to mongodb
  const database = await db();
  const collection = database.collection("posts");

  const result = await collection.insertOne(data);
  console.log(result);
  res.status(200).json({
    message: "post created",
  });
});

router.delete("/delete/:id", async (req, res) => {
  // Step:1--get databse
  const database = await db();
  //Step:2-- get collection
  const collection = database.collection("posts");
  try {
    const deletePost = await collection.remove({
      _id: mongodb.ObjectId(req.params.id),
    });
    res.status(200).json({
      post: deletePost,
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/edit/:id", async (req, res, next) => {
  // Step 1: get data from req object
  const data = {
    post: req.body.post,
  };
  // Step 2: Connect to mongodb
  const database = await db();
  const collection = database.collection("posts");

  try {
    await collection.updateOne(
      { _id: mongodb.ObjectId(req.params.id) },
      { $set: data },
      { upsert: true }
    );

    res.status(200).json({
      message: "post edited",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
// export default router;
