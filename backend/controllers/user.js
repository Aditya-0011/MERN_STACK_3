const User = require("../models/user");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select(
      "id name username email phone website -_id",
    );
    res.status(200).json(users);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.postNewUsers = async (req, res, next) => {
  try {
    const { users } = req.body;
    const result = await User.insertMany(users);
    res.status(200).json(result);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
