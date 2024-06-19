require("dotenv").config({ path: "../.env" });
const path = require("path");
const { service, oAuthClient } = require("../config/googleSheetsConfig");
const { readFileSync } = require("fs");
const { envDataParser } = require("./functions");

const authCredentialToken = {
  access_token: process.env.access_token,
  refresh_token: process.env.refresh_token,
  scope: process.env.scope,
  token_type: process.env.token_type,
  expiry_date: process.env.expiry_date,
};

const createSpreadsheet = async (req, res) => {
  const resource = {
    resource: {
      properties: {
        title: "test spreadsheet",
      },
    },
  };
  const tokens = authCredentialToken;
  try {
    oAuthClient.setCredentials(tokens);
    const spreadsheet = await service.spreadsheets.create(resource);
    const sheetId = spreadsheet.data.spreadsheetId;
    envDataParser({ SHEET_ID: sheetId });
    res.status(200).json({ message: `The spreadsheet was created` });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "An error occured while creating the spreadsheet" });
  }
};

// oauth redirect login
const authRedirectRoute = async (req, res) => {
  const scopes = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
  ];

  const url = oAuthClient.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  res.redirect(url);
};

// oauthlogin
const authClientRoute = async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oAuthClient.getToken(code);
    oAuthClient.setCredentials(tokens);
    envDataParser(tokens);
    res.status(200).json({ message: "Authentication successful" });
  } catch (error) {
    console.error(error);
    res.status(200).json({ message: "Authentication unsucessful" });
  }
};

module.exports = { createSpreadsheet, authClientRoute, authRedirectRoute };
