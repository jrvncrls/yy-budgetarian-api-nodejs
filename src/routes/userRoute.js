const express = require("express");
const router = express.Router();
const { userService } = require("../services");
const { getUserById } = userService;

router.get("/getUsers", getUserById);

module.exports = router;
