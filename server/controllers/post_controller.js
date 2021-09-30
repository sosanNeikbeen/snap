const postModel = require("../models/post_model");

module.exports = {
  createPost: (req, res, next) => {
    const { post, image } = req.body;
    postCreate = new postModel({
      post,
      image,
    });
    postCreate.save((err, files) => {
      if (err) {
        console.log(err);
      }
      res.status(201).json(files);
    });
  },

  getPosts: (req, res, next) => {
    postModel
      .find()
      .then((files) => {
        res.send(files);
      })
      .catch((err) => console.log(err));
  },

  getPost: (req, res, next) => {
    postModel.findOne({ _id: req.params.id }, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    });
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
          console.log("Data updated!");
        }
      }
    );
  },
};
