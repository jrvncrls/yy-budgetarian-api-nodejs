const balanceConnection = require("../database/balanceConnection");
const _ = require("lodash");

exports.getBalanceByUser = async (req, res) => {
  try {
    const result = await balanceConnection.getBalanceByUser(req.query.userId);

    return res.status(200).json({ isError: false, result });
  } catch (error) {
    return res.status(500).json({ isError: true, error });
  }
};

exports.updateBalance = async (userAmountDetails, totalExpense, userId) => {
  try {
    for (const userDetails of userAmountDetails) {
      const newBalance =
        totalExpense -
        (userDetails.totalPaymentAmount + userDetails.totalExpenseAmount);

      const roundOffBal = _.round(newBalance, 2);

      const result = await balanceConnection.updateBalanceByUser(
        roundOffBal,
        userDetails._id
      );
      console.log(`User ${userDetails.username} has been updated!`);
    }
    const getBalanceResult = await balanceConnection.getBalanceByUser(userId);

    return { newBalance: getBalanceResult.amount };
  } catch (error) {
    return res.status(500).json({ isError: true, error });
  }
};

exports.calculateBalance = async () => {
  try {
    const result = await balanceConnection.calculateBalancePerUser();

    return result;
  } catch (error) {
    return res.status(500).json({ isError: true, error });
  }
};
