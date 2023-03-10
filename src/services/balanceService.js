const balanceConnection = require("../database/balanceConnection");
const _ = require("lodash");

exports.getBalanceByUser = async (req, res) => {
  try {
    const result = await balanceConnection.getBalanceByUser(req.query.username);

    return res.status(200).json({ isError: false, result });
  } catch (error) {
    return res.status(500).json({ isError: true, error });
  }
};

exports.updateBalance = async (req, res) => {
  const payload = req.body;
  let userAmountDetails = payload.userAmountDetails;

  try {
    const lowerBalUser = userAmountDetails.reduce((prev, curr) => {
      return prev.newBalance < curr.newBalance ? prev : curr;
    });
    const higherBalUser = userAmountDetails.reduce((prev, curr) => {
      return prev.newBalance > curr.newBalance ? prev : curr;
    });

    if (lowerBalUser.newBalance != higherBalUser.newBalance) {
      // Set lower bal user to 0 balance
      const updateBalanceLowerBalUser =
        await balanceConnection.updateBalanceByUser(0, lowerBalUser.username);

      // Set higher bal user to balance - lowerBalance
      const updateBalanceHigherBalUser =
        await balanceConnection.updateBalanceByUser(
          _.round(higherBalUser.newBalance - lowerBalUser.newBalance, 2),
          higherBalUser.username
        );
    } else {
      // set all balance of user to 0
      for (const userDetails of userAmountDetails) {
        const result = await balanceConnection.updateBalanceByUser(
          0,
          userDetails.username
        );
      }
    }

    const getBalanceResult = await balanceConnection.getBalanceByUser(
      payload.username
    );
    return res
      .status(200)
      .json({ isError: false, newBalance: getBalanceResult.amount });
  } catch (error) {
    return res.status(500).json({ isError: true, error });
  }
};

exports.calculateBalance = async (req, res) => {
  try {
    const result = await balanceConnection.calculateBalancePerUser();

    return res.status(200).json({ isError: false, result });
  } catch (error) {
    return res.status(500).json({ isError: true, error });
  }
};
