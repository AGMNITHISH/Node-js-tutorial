const asyncHandler = require("express-async-handler");
const userModal = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

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
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(404);
      throw new Error("email and password is required");
    }
    const findUser = await userModal.findOne({ email });

    if (findUser && (await bcrypt.compare(password, findUser.password))) {
      res.status(200).json({
        _id: findUser.id,
        name: findUser.username,
        email: findUser.email,
        token: genToken(findUser.id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getALLUser = asyncHandler(async (req, res) => {
  try {
    const result = await userModal.find();
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

const newUser = asyncHandler(async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userExist = await userModal.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User Exists" });
    }

    const newUser = new userModal({
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Interna; server error" });
  }
});
const getMe = asyncHandler(async (req, res) => {
  try {
    const { _id, username, email } = await userModal.findById(req.user.id);
    res.status(200).json({
      id: _id,
      username,
      email,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  addUser,
  getMe,
  getALLUser,
  updateUser,
  deleteUser,
  loginUser,
  newUser,
};
