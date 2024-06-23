require("dotenv").config({ path: "../.env" });
const { google } = require("googleapis");

// initialised the oAuth2 authentication instance from the google cloud provider
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
