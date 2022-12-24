const express = require("express");
const router = express.Router();
const { userService } = require("../services");
const { getUserByUsername } = userService;

router.get("/getUsers", getUserByUsername);

module.exports = router;
