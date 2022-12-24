const connection = require("../database/connection");

exports.getUsers = async (req, res) => {
  try {
    let query = "";

    if (req.query.id) {
      query = `SELECT Id as id, Username as username from users where id = '${req.query.id}'`;
    } else {
      query = `SELECT Id as id, Username as username from users`;
    }

    const result = await connection(query);

    return res.status(200).json({ isError: false, result });
  } catch (error) {
    return res.status(500).json({ isError: true, error });
  }
};
