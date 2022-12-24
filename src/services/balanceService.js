const connection = require("../database/connection");

exports.getBalanceByUser = async (req, res) => {
  try {
    const query = `SELECT Amount as amount from balance WHERE UserId = ${req.query.userId}`;

    const result = await connection(query);

    return res.status(200).json({ isError: false, result });
  } catch (error) {
    return res.status(500).json({ isError: true, error });
  }
};

exports.updateBalance = async (userId) => {
  try {
    const query =
      `SET @yobabUserId = 1;` +
      `SET @yobuUserId = 2;` +
      `SET @totalExpense = CAST((SELECT COALESCE((SUM(Amount) / 2), 0)FROM expenses) AS float);` +
      `SET @yobabTotalCashOut = CAST((SELECT COALESCE(SUM(Amount), 0) FROM expenses where UserId = @yobabUserId) AS float)/2;` +
      `SET @yobuTotalCashOut = CAST((SELECT COALESCE(SUM(Amount), 0) FROM expenses where UserId = @yobuUserId) AS float)/2;` +
      `SET @yobabTotalPayment = CAST((SELECT COALESCE(SUM(Amount), 0) FROM payments where  UserId = @yobabUserId) AS float);` +
      `SET @yobuTotalPayment = CAST((SELECT COALESCE(SUM(Amount), 0) FROM payments where  UserId = @yobuUserId) AS float);` +
      `SET @yobabNewBalance = @totalExpense - (@yobabTotalCashOut + @yobabTotalPayment);` +
      `SET @yobuNewBalance = @totalExpense - (@yobuTotalCashOut + @yobuTotalPayment);` +
      `UPDATE balance SET Amount = @yobabNewBalance WHERE UserId = @yobabUserId;` +
      `UPDATE balance SET Amount = @yobuNewBalance WHERE UserId = @yobuUserId;` +
      `SELECT Amount as amount from balance WHERE UserId = ${userId}`;

    const result = await connection(query);
    return result[result.length - 1];
  } catch (error) {
    return res.status(500).json({ isError: true, error });
  }
};
