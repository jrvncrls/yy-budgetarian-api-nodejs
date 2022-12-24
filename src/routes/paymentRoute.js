const express = require("express");
const router = express.Router();
const { paymentService } = require("../services");
const { addPayment } = paymentService;

router.post("/addPayment", addPayment);

module.exports = router;
