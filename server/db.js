// const { MongoClient } = require("mongodb");
import { MongoClient } from "mongodb";

const db = async () => {
  const uri =
    "mongodb+srv://dbuser:HDT5YUAAjSKqgvrk@cluster0.m481g.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    const result = await client.connect();
    if (result) {
      console.log("connected");
    }
  } catch (err) {
    console.log("an error occured");
  }
  const database = client.db("social_media");

  return database;
};

// module.exports = db;
export default db;
