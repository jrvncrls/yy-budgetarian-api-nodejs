const balanceConnection = require("../database/balanceConnection");

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
      const result = await balanceConnection.updateBalanceByUser(
        userDetails,
        totalExpense
      );
      console.log(`User ${userDetails.username} has been updated!`);
    }

    let newBalance = 0;
    let userAmountDetailsById = userAmountDetails.find((x) => x._id == userId);
    newBalance =
      totalExpense -
      (userAmountDetailsById.totalPaymentAmount +
        userAmountDetailsById.totalExpenseAmount);

    return { newBalance };
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
