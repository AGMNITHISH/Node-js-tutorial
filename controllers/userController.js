const asyncHandler = require("express-async-handler");
const userModal = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const addUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400);
      throw new Error("username or password is missing");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPswd = await bcrypt.hash(password, salt);
    const result = await userModal.create({
      username,
      email,
      password: hashedPswd,
    });
    if (result) {
      res.status(201).json({
        user: {
          msg: "new user created",
          name: result.username,
          email: result.email,
        },
      });
    } else {
      res.status(404);
      throw new Error("new user is not created");
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getALLUser = asyncHandler(async (req, res) => {
  try {
    const result = await userModal.find().select({
      _id: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
      password: 0,
    });
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { email } = req.params;
    const { newName } = req.body;
    if (!email || !newName) {
      res.status(404);
      throw new Error("manditory fileds missing");
    }

    const checkExisting = await userModal.findOne({ email: email });

    if (!checkExisting) {
      res.status(404);
      throw new Error("no user found");
    }
    const updateUser = await userModal.findOneAndUpdate(
      { email: email },
      { $set: { username: newName } },
      { new: true }
    );

    if (!updateUser) {
      res.status(404).json({ err: "user not updated" });
    }
    res.status(200).json({
      data: {
        name: updateUser.username,
        email: updateUser.email,
      },
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { email } = req.params;
  try {
    if (!email) {
      res.status(404);
      throw new Error("email is required");
    }
    const checkExisting = await userModal.findOne({ email: email });
    if (!checkExisting) {
      res.status(404);
      throw new Error(`${email}  is not a existing user`);
    }

    const deleteUser = await userModal.findOneAndDelete({ email: email });

    if (deleteUser) {
      res.status(200).json({
        doc: deleteUser,
      });
    } else {
      res.status(404);
      throw new Error("Someting went wromg, user not deleted");
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { addUser, getALLUser, updateUser, deleteUser };
