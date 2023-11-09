const asyncHandler = require("express-async-handler");
const userModal = require("../model/userModel");

const addUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username && !password) {
    res.status(400);
    throw new Error("username or password is missing");
  }
  const result = await userModal.create({
    username,
    password,
  });
  res.status(200).json({
    result,
  });
});

const getALLUser = asyncHandler(async (req, res) => {
  const result = await userModal.find();
  res.status(200).json({
    msg: result,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { name } = req.params;
    const { newName } = req.body;
    if (name && newName) {
      const updateUser = await userModal.findOneAndUpdate(
        { username: name },
        { $set: { username: newName } },
        { new: true }
      );

      if (!updateUser) {
        res.status(404).json({ err: "user not found" });
      }
      res.status(200).json({
        doc: updateUser,
      });
    } else {
      res.status(400);
      throw new Error("required fields missing");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { name } = req.params;
  try {
    if (!name) {
      res.status(404);
      throw new Error("username is required");
    }

    const deleteUser = await userModal.findOneAndDelete({ username: name });

    if (deleteUser) {
      res.status(200).json({
        doc: deleteUser,
      });
    } else {
      res.status(404);
      throw new Error("user not found");
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { addUser, getALLUser, updateUser, deleteUser };
