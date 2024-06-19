require("dotenv").config({ path: "../.env" });
const { GoogleAuth } = require("google-auth-library");
const { google } = require("googleapis");

const auth = new GoogleAuth({
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const service = google.sheets({
  version: "v4",
  auth: process.env.SHEETS_API_KEY,
});
module.exports = { service };
