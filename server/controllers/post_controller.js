const postModel = require("../models/post_model");

module.exports = {
  createPost: (req, res, next) => {
    const { post, image, userId } = req.body;
    postCreate = new postModel({
      post,
      image,
      userId,
    });
    postCreate.save((err, files) => {
      if (err) {
        console.log(err);
      }
      res.status(201).json(files);
    });
  },

  getPosts: async (req, res, next) => {
    try {
      const posts = await postModel.find().populate("userId").exec();
      res.send(posts);
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Something went wrong",
      });
    }
  },

  getPost: (req, res, next) => {
    postModel
      .findOne({ _id: req.params.id }, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          res.send(data);
        }
      })
      .populate("userId")
      .exec();
  },
  deletePost: (req, res, next) => {
    postModel.findByIdAndDelete(req.params.id, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    });
  },
  updatePost: (req, res, next) => {
    postModel.findByIdAndUpdate(
      req.params.id,
      { post: req.body.post },
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          res.send(data);
          console.log("Post updated!");
        }
      }
    );
  },
};
