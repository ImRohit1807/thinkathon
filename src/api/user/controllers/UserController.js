const bcrypt = require('bcrypt');
const UserService = require('../services/UserService');
const saltRounds = 10;
const logger = require('../../../middleware/logger');

// create new user
exports.createUser = async (req, res) => {
  logger.info('create users -->');
  logger.warn('Warn message');
  logger.error('error message');
  UserService.create(req.body)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || 'Some error occurred while retrieving data.'
      });
    });
};

exports.getUsers = async (req, res) => {
  UserService.getAll()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || 'Some error occurred while retrieving data.'
      });
    });
};

exports.getUser = async (req, res) => {
  UserService.get(req.params.id)
    .then((response) => {
      if (response !== null) {
        res.send(response);
      } else {
        res.status(400).send({
          message: `Can not find User with given id ${req.params.id}. User was not found!`
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || 'Some error occurred while retrieving data.'
      });
    });
};

exports.updateUser = async (req, res) => {
  UserService.update(req.params.id, req.body)
    .then((response) => {
      if (response !== null) {
        res.send(response);
      } else {
        res.status(400).send({
          message: `Can not find User with given id ${req.params.id}. User was not found!`
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        code: err.code,
        message: err.message || 'Some error occurred while retrieving data.'
      });
    });
};

exports.updatePassword = async (req, res) => {
  const password = bcrypt.hashSync(req.body.password, saltRounds);
  const body = {
    password
  };
  UserService.updatePassword(req.params.emailAddress, body)
    .then((response) => {
      if (response !== null) {
        res.send(response);
      } else {
        res.status(400).send({
          message: `Can not find User with given id ${req.params.id}. User was not found!`
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || 'Some error occurred while retrieving data.'
      });
    });
};

exports.deleteUser = async (req, res) => {
  UserService.delete(req.params.id)
    .then((response) => {
      if (response !== null) {
        res.send(response);
      } else {
        res.status(400).send({
          message: `Can not find User with given id ${req.params.id}. User was not found!`
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || 'Some error occurred while retrieving data.'
      });
    });
};
