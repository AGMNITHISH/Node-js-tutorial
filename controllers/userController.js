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

const updateUser = asyncHandler(async (req, res) => {
  const { name } = req.params;
  try {
    res.status(200).json({
      msg: `user ${name} updated`,
    });
  } catch (error) {
    throw new Error("update error");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { name } = req.params;
  try {
    res.status(200).json({
      msg: `user ${name} deleted`,
    });
  } catch (error) {
    throw new Error("delete error");
  }
});

module.exports = { addUser, getALLUser, updateUser, deleteUser };
