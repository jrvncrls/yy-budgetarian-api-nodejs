const authConnection = require("../database/authConnection");

exports.login = async (req, res) => {
  try {
    const payload = req.body;

    const result = await authConnection.login(payload);

    let isAuthorized = false;

    if (result != null) {
      isAuthorized = true;
    }

    return res.status(200).json({
      isError: false,
      result: [
        {
          isAuthorized,
          userId: isAuthorized ? result._id : null,
        },
      ],
    });
  } catch (error) {
    return res.status(500).json({ isError: true, error });
  }
};
