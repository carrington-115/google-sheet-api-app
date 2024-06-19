require("dotenv").config({ path: "../.env" });
const { google } = require("googleapis");

const oAuthClient = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.SECRET_KEY,
  process.env.LOGIN_URL
);

const service = google.sheets({
  version: "v4",
  auth: oAuthClient,
});
module.exports = { service, oAuthClient };
