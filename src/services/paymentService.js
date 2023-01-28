const balanceService = require("./balanceService");
const paymentConnection = require("../database/paymentConnection");

exports.addPayment = async (req, res) => {
  try {
    const payload = req.body;

    const addPaymentResult = await paymentConnection.addPayment(payload);

    return res.status(200).json({
      isError: false,
      result: [
        {
          message: "New payment has been added!",
        },
      ],
    });
  } catch (error) {
    return res.status(500).json({ isError: true, error });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const result = await paymentConnection.getAllPayments();

    return res.status(200).json({ isError: false, result });
  } catch (error) {
    return res.status(500).json({ isError: true, error });
  }
};
