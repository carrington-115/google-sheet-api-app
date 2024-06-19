const express = require("express");
const {
  authRedirectRoute,
  authClientRoute,
} = require("../controllers/googleSheetsFunctions");
const router = express.Router();

router.get("/", authRedirectRoute);
router.get("/oauthlogin", authClientRoute);

module.exports = router;
