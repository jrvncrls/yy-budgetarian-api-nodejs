const connection = require("../database/connection");
const balanceService = require("./balanceService");

exports.addPayment = async (req, res) => {
  try {
    const payload = req.body;
    const query =
      `INSERT INTO ` +
      `payments (Amount, UserId) ` +
      `VALUES ` +
      `('${payload.amount}', '${payload.userId}')`;

    const result = await Promise.all([
      connection(query),
      balanceService.updateBalance(payload.userId),
    ]);

    return res.status(200).json({
      isError: false,
      result: [
        {
          newBalance: result[1][0].amount,
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
