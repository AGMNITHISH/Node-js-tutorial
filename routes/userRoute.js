const express = require("express");
const router = express.Router();
const {
  addUser,
  getALLUser,
  updateUser,
  deleteUser,
  loginUser,
  newUser,
  getMe,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

router.route("/").get(protect, getALLUser).post(addUser);
router.route("/:email").put(protect, updateUser).delete(protect, deleteUser);
router.post("/login", loginUser);
router.post("/register", newUser);
router.get("/me", protect, getMe);

module.exports = router;
