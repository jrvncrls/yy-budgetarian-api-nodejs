const userConnection = require("../database/userConnection");

exports.getUserByUsername = async (req, res) => {
  try {
    const result = await userConnection.getUserByUsername(
      req.query.username
    );

    return res.status(200).json({ isError: false, result });
  } catch (error) {
    return res.status(500).json({ isError: true, error });
  }
};
