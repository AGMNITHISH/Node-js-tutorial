const express = require("express");
const router = express.Router();
const { addUser, getALLUser } = require("../controllers/userController");

router.route("/").get(getALLUser).post(addUser);

module.exports = router;
