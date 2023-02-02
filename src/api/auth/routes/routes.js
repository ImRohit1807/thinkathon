const express = require("express");
const router = express.Router();
const authentication = require("../../../middleware/utils");

const AuthController = require("../controllers/AuthController");

router.post("/login", AuthController.login);

router.get(
  "/:id/getToken",
  authentication.validateToken,
  AuthController.getToken
);


module.exports = router;
