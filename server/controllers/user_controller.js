const userModel = require("../models/user_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (req, res, next) => {
    const { name, location, email, password: plainTextPassword } = req.body;

    if (!plainTextPassword || typeof plainTextPassword !== "string") {
      return res
        .status(400)
        .send({ status: "error", message: "Invalid password" });
    }

    if (plainTextPassword.length < 5) {
      return res.status(400).send({
        status: "error",
        message: "Password too short. It should be at least 6 characters",
      });
    }

    const password = await bcrypt.hash(plainTextPassword, 10);

    userModel.findOne({ email: email }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (user) {
        return res.status(400).send({
          message: "Email is already in use",
        });
      } else {
        const newUser = new userModel({
          name,
          location,
          email,
          password,
        });
        newUser
          .save()
          .then((user) => {
            res.send(user);
          })
          .catch((err) => {
            return res.status(400).send({
              message: "Something went wrong",
            });
          });
      }
    });
  },

  loginUser: async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).lean();

    if (!user) {
      return res
        .status(400)
        .send({ status: "error", message: "Invalid username/password" });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          name: user.name,
          location: user.location,
          picture: user.picture,
        },
        process.env.JWT_SECRET
      );

      return res.json({ status: "ok", token, user: user });
    }
    res
      .status(400)
      .send({ status: "error", message: "Invalid username/password" });
  },

  getUser: (req, res, next) => {
    userModel.findOne({ _id: req.params.id }, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    });
  },
  updateProfile: (req, res, next) => {
    userModel.findByIdAndUpdate(
      req.params.id,
      { picture: req.body.picture },
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          res.send(data);
          console.log("Profile updated!");
        }
      }
    );
  },
};
