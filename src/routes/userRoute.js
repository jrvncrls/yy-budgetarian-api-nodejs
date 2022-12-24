const express = require("express");
const router = express.Router();
const { userService } = require("../services");
const { getUsers } = userService;

router.get("/getUsers", getUsers);

module.exports = router;
