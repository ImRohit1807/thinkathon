const bcrypt = require("bcrypt");
const UserService = require("../Services/UserService");
const saltRounds = 10;

exports.createUser = async (req, res) => {
  console.log('create user-->')
  UserService.create(req.body)
    .then((response) => {
      console.log("Res", response);
      res.send(response);
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

exports.test = async (req, res) => {
  console.log('create user-->')
  res.send("response");
  // UserService.create(req.body)
  //   .then((response) => {
  //     console.log("Res", response);
  //     res.send(response);
  //   })
  //   .catch((err) => {
  //     res.status(400).send({
  //       message: err.message || "Some error occurred while retrieving data.",
  //     });
  //   });
};
exports.getUsers = async (req, res) => {
  console.log("get ", req.query);
  let filter = {};
  if (req.query.filter) {
    filter = JSON.parse(req.query.filter);
  }
  filter.crewIds = req.params.id;
  UserService.getAll(filter)
    .then((response) => {
      console.log("Res", response);
      res.send(response);
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

exports.getUserWithToken = async (req, res) => {
  console.log("req", req.decoded);
  if (!req.decoded.user.username) {
    res.status(400).send({
      message: `Insufficient details.`,
    });
    return;
  }
  UserService.getUser(req.decoded.user)
    .then((response) => {
      if (response !== null) {
        console.log("Res", response);
        res.send(response);
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

exports.getUser = async (req, res) => {
  console.log("req", req);
  UserService.get(req.params.id)
    .then((response) => {
      if (response !== null) {
        console.log("Res", response);
        res.send(response);
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
exports.updateUser = async (req, res) => {
  UserService.update(req.params.id, req.body)
    .then((response) => {
      if (response !== null) {
        console.log("Res", response);
        res.send(response);
      } else {
        res.status(400).send({
          message: `Can not find User with given id ${req.params.id}. User was not found!`,
        });
      }
    })
    .catch((err) => {
      console.log("errr", err);
      res.status(400).send({
        code: err.code,
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

exports.updatePassword = async (req, res) => {
  console.log("object", req.body, req.params.emailAddress);
  let password = bcrypt.hashSync(req.body.password, saltRounds);
  let body = {
    password: password,
  };
  UserService.updatePassword(req.params.emailAddress, body)
    .then((response) => {
      if (response !== null) {
        console.log("Res", response);
        res.send(response);
      } else {
        res.status(400).send({
          message: `Can not find User with given id ${req.params.id}. User was not found!`,
        });
      }
    })
    .catch((err) => {
      console.log("err", err);
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};
exports.deleteUser = async (req, res) => {
  UserService.delete(req.params.id)
    .then((response) => {
      if (response !== null) {
        console.log("Res", response);
        res.send(response);
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
