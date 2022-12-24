const express = require("express");
const router = express.Router();
const { expenseService } = require("../services");
const { addExpense } = expenseService;

router.post("/addExpense", addExpense);

module.exports = router;
