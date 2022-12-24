const connection = require("../database/connection");

exports.login = async (req, res) => {
  try {
    const payload = req.body;
    const query =
      `SELECT * from users ` +
      `where Username = '${payload.username}' and ` +
      `password =  '${payload.password}'`;

    const result = await connection(query);

    let isAuthorized = false;

    if (result.length > 0) {
      isAuthorized = true;
    }

    return res.status(200).json({
      isError: false,
      result: [
        {
          isAuthorized,
          userId: result[0].Id
        },
      ],
    });
  } catch (error) {
    return res.status(500).json({ isError: true, error });
  }
};
