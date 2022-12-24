const balanceService = require("./balanceService");
const expenseConnection = require("../database/expenseConnection");

exports.addExpense = async (req, res) => {
  try {
    const payload = req.body;

    const result = await Promise.all([
      expenseConnection.addExpense(payload),
      balanceService.updateBalance(payload.userId),
    ]);

    return res.status(200).json({
      isError: false,
      result: [
        {
          newBalance: result[1].newBalance,
          message: "New expense has been added!",
        },
      ],
    });
  } catch (error) {
    return res.status(500).json({ isError: true, error });
  }
};
