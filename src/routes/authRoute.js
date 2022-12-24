const express = require("express");
const router = express.Router();
const { authService } = require("../services");
const { login } = authService;

router.post("/login", login);

module.exports = router;
