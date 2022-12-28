const express = require("express");
const router = express.Router();
const { paymentService } = require("../services");
const { addPayment, getPayments } = paymentService;

router.post("/addPayment", addPayment);
router.get("/getPayment", getPayments);

module.exports = router;
