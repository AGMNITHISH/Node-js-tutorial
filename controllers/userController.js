const asyncHandler = require("express-async-handler");

const addUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    msg: req.body,
  });
});

const getALLUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    msg: "get ALL User",
  });
});
module.exports = { addUser, getALLUser };
