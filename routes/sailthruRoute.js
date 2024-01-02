const express = require("express");
const router = express.Router();
const { createTemplate } = require("../controllers/sailthruController");

router.post("/", createTemplate);

module.exports = router;
