const express = require("express");
const {
  createSpreadsheet,
  readSpreadSheetData,
} = require("../controllers/googleSheetsFunctions");
const router = express.Router();

router.get("/create-sheet", createSpreadsheet);
router.get("/read-sheet", readSpreadSheetData);

module.exports = router;
