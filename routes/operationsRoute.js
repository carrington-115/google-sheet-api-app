const express = require("express");
const { createSpreadsheet } = require("../controllers/googleSheetsFunctions");
const router = express.Router();

router.get("/create-sheet", createSpreadsheet);

module.exports = router;
