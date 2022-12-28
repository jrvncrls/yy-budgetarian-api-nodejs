const express = require("express");
const router = express.Router();
const { expenseService } = require("../services");
const { addExpense, getExpenses } = expenseService;

router.post("/addExpense", addExpense);
router.get("/getExpense", getExpenses);

module.exports = router;
