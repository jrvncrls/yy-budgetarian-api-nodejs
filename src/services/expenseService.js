const balanceService = require("./balanceService");
const expenseConnection = require("../database/expenseConnection");

exports.addExpense = async (req, res) => {
  try {
    const payload = req.body;

    const addExpenseResult = await expenseConnection.addExpense(payload);
    const calBalanceResult = await balanceService.calculateBalance();
    const updateBalResult = await balanceService.updateBalance(
      calBalanceResult.userAmountDetails,
      payload.username
    );

    return res.status(200).json({
      isError: false,
      result: [
        {
          newBalance: updateBalResult.newBalance,
          message: "New expense has been added!",
        },
      ],
    });
  } catch (error) {
    return res.status(500).json({ isError: true, error });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const result = await expenseConnection.getAllExpenses();

    return res.status(200).json({ isError: false, result });
  } catch (error) {
    return res.status(500).json({ isError: true, error });
  }
};
