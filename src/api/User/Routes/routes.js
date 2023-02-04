const express = require('express');
const router = express.Router();
const authentication = require('../../../Resource/utils');
const UserController = require('../Controllers/UserController');

router.post('/create', UserController.createUser);

router.get(
  '/findAll',
  authentication.validateToken,
  UserController.getUsers
);

router.get('/:id/find', authentication.validateToken, UserController.getUser);

router.delete(
  '/:id/delete',
  authentication.validateToken,
  UserController.deleteUser
);

router.patch(
  '/:id/update',
  authentication.validateToken,
  UserController.updateUser
);

router.patch(
  '/:emailAddress/update_password',
  authentication.validateToken,
  UserController.updatePassword
);
module.exports = router;