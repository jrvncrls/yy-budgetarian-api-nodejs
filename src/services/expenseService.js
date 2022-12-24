const connection = require("../database/connection");
const balanceService = require("./balanceService");

exports.addExpense = async (req, res) => {
  try {
    const payload = req.body;
    const query =
      `INSERT INTO ` +
      `expenses ` +
      `VALUES ` +
      `(null, '${payload.amount}', '${payload.description}', ` +
      `'${payload.userId}', '${payload.method}')`;

    const result = await Promise.all([
      connection(query),
      balanceService.updateBalance(payload.userId),
    ]);

    return res.status(200).json({
      isError: false,
      result: [
        {
          newBalance: result[1][0].amount,
          message: "New expense has been added!",
        },
      ],
    });
  } catch (error) {
    return res.status(500).json({ isError: true, error });
  }
};

exports.getTotalExpense = async () => {
  try {
    const query = `SELECT (SUM(Amount) / 2) AS Total FROM expenses`;

    const result = await connection(query);

    return result.Total;
  } catch (error) {
    return error;
  }
};

exports.getTotalExpenseByUser = async (req, res) => {
  try {
    const payload = req.body;

    const query =
      `SELECT SUM(Amount) AS Total FROM expenses` +
      `where  UserId = '${payload.userId}' and ExpenseMethod = 'Cash'`;

    const result = await connection(query);

    return result.Total;
  } catch (error) {
    return res.status(500).json({ isError: true, error });
  }
};
