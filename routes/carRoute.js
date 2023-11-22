const express = require("express");
const router = express.Router();
const {
  addCarDetails,
  allCars,
  modelBasedonBrand,
  carBodyBasedOnModel,
} = require("../controllers/carController");
const protect = require("../middleware/authMiddleware");

router.route("/").get(protect, allCars).post(protect, addCarDetails);
router.get("/:brand", protect, modelBasedonBrand);
router.get("/type/:model", protect, carBodyBasedOnModel);

module.exports = router;
