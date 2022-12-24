const express = require("express");
const router = express.Router();
const { balanceService } = require("../services");
const { getBalanceByUser } = balanceService;

router.get("/getBalance", getBalanceByUser);

module.exports = router;
