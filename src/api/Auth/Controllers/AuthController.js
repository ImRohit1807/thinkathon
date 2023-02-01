const AuthService = require("../Services/AuthService");
const User = require("../../User/Entities/User");
const authentication = require("../../../Resource/utils");
const bcrypt = require("bcrypt");
require("dotenv").config;

exports.login = async (req, res) => {
  await User.findOne({ username: req.body.username })
    .select("+password")
    .then(async (data) => {
      console.log("Res", data);
      let result = {};

      if (data !== null) {
        let user = {
          username: data.username,
          emailAddress: data.emailAddress,
          role: data.role,
          superAdmin: data.superAdmin,
          crewIds: data.crewIds,
          _id: data._id,
          name: data.name,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        };
        const payload = { user };
        result.token = authentication.generateToken(payload);
        result.user = user;
        if (req.body.password == process.env.password) {
          res.send(result);
        } else {
          await bcrypt
            .compare(req.body.password, data.password)
            .then((match) => {
              if (match) {
                res.send(result);
              } else {
                res.status(403).send({
                  message: "User enters an invalid password",
                });
              }
            });
        }
      } else {
        res.status(400).send({
          message: `Can not find User with given username ${req.body.username}. User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

exports.getToken = async (req, res) => {
  console.log("get users", req.decoded.user);
  if (!req.decoded.user.role || req.decoded.user.role !== "ADMIN") {
    res.status(400).send({
      message: `User do not have access permissions.`,
    });
    return;
  }
  await User.findById(req.params.id)
    .then((user) => {
      console.log("Res", user);
      let result = {};
      if (user !== null) {
        const payload = { user };
        result.token = authentication.generateToken(payload);
        result.user = user;
        res.send(result);
      } else {
        res.status(400).send({
          message: `Can not find User with given id ${req.params.id}. User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

