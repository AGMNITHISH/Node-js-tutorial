const express = require("express");
const router = express.Router();
const {
  addTableData,
  getTableData,
  updateTableDataStatus,
  deleteTableData,
  updateTableDataFav,
} = require("../controllers/reactTableController");
const protect = require("../middleware/authMiddleware");

router.get("/:id", protect, getTableData);
router.post("/", protect, addTableData);
router
  .route("/:model")
  .put(protect, updateTableDataStatus)
  .delete(protect, deleteTableData);
router.put("/fav/:model", protect, updateTableDataFav);

module.exports = router;
