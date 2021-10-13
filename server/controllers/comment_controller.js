const commentModel = require("../models/comment_model");

module.exports = {
  createComment: (req, res, next) => {
    const { comment, postId, userId } = req.body;
    commentCreate = new commentModel({
      comment,
      postId,
      userId,
    });
    commentCreate.save((err, files) => {
      if (err) {
        console.log(err);
      }
      res.status(201).json(files);
    });
  },

  getComments: async (req, res, next) => {
    try {
      const comments = await commentModel.find().populate("userId").exec();
      res.send(comments);
    } catch (error) {
      console.log(error);
    }
  },

  getComment: (req, res, next) => {
    commentModel.findOne({ _id: req.params.id }, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    });
  },
  deleteComment: (req, res, next) => {
    commentModel.findByIdAndDelete(req.params.id, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    });
  },
  updateComment: (req, res, next) => {
    commentModel.findByIdAndUpdate(
      req.params.id,
      { comment: req.body.comment },
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
