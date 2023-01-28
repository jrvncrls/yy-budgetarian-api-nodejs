const express = require("express");
const router = express.Router();
const { balanceService } = require("../services");
const { getBalanceByUser, calculateBalance, updateBalance } = balanceService;

router.get("/getBalance", getBalanceByUser);
router.get("/getCalculatedBalance", calculateBalance)
router.post("/updateBalance", updateBalance)

module.exports = router;
