const balanceConnection = require("../database/balanceConnection");

exports.getBalanceByUser = async (req, res) => {
  try {
    const result = await balanceConnection.getBalanceByUser(req.query.userId);

    return res.status(200).json({ isError: false, result });
  } catch (error) {
    return res.status(500).json({ isError: true, error });
  }
};

exports.updateBalance = async (userId) => {
  try {
    const result = await balanceConnection.updateBalanceByUser(userId);
    
    return result;
  } catch (error) {
    return res.status(500).json({ isError: true, error });
  }
};
