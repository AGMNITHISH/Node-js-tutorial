const express = require("express");
const router = express.Router();
const {
  addTableData,
  getTableData,
  updateTableDataStatus,
  deleteTableData,
  updateTableDataFav,
} = require("../controllers/reactTableController");

router.route("/").get(getTableData).post(addTableData);
router.route("/:model").put(updateTableDataStatus).delete(deleteTableData);
router.put("/fav/:model", updateTableDataFav);

module.exports = router;
