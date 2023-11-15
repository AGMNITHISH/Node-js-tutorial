const express = require("express");
const router = express.Router();
const {
  addUser,
  getALLUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.route("/").get(getALLUser).post(addUser);

router.route("/:email").put(updateUser).delete(deleteUser);

module.exports = router;
