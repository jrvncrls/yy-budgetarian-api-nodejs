const balanceService = require("./balanceService");
const paymentConnection = require("../database/paymentConnection");

exports.addPayment = async (req, res) => {
  try {
    const payload = req.body;

    const result = await Promise.all([
      paymentConnection.addPayment(payload),
      balanceService.updateBalance(payload.userId),
    ]);

    return res.status(200).json({
      isError: false,
      result: [
        {
          newBalance: result[1].newBalance,
          message: "New payment has been added!",
        },
      ],
    });
  } catch (error) {
    return res.status(500).json({ isError: true, error });
  }
};

exports.getTotalPaymentByUser = async (req, res) => {
  try {
    const query =
      `SELECT SUM(Amount) AS Total FROM payments` +
      `where  UserId = '${payload.userId}'`;

    const result = await connection(query);

    return result.Total;
  } catch (error) {
    return res.status(500).json({ isError: true, error });
  }
};
