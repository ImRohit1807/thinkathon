const express = require("express");
const router = express.Router();
const authentication = require("../../../Resource/utils");
const AuthController = require("../Controllers/AuthController");

router.post("/login", AuthController.login);

router.get(
  "/:id/getToken",
  authentication.validateToken,
  AuthController.getToken
);


module.exports = router;
