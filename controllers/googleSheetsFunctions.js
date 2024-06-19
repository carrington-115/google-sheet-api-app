const path = require("path");
const { service, oAuthClient } = require("../config/googleSheetsConfig");
const { writeFileSync, readFileSync } = require("fs");

const createSpreadsheet = async (req, res) => {
  const resource = {
    resource: {
      properties: {
        title: "test spreadsheet",
      },
    },
  };
  const tokens = JSON.parse(
    readFileSync(path.join(__dirname, "tokens.json"), "utf8")
  );
  try {
    oAuthClient.setCredentials(tokens);
    const spreadsheet = await service.spreadsheets.create(resource);
    const sheetId = spreadsheet.data.spreadsheetId;
    console.log("The sheetid is", sheetId);
    res
      .status(200)
      .json({ message: `The spreadsheet was created with id: ${sheetId}` });
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
    writeFileSync(
      path.join(__dirname, "tokens.json"),
      JSON.stringify(tokens, null, 2)
    );
    res.status(200).json({ message: "Authentication successful" });
  } catch (error) {
    console.error(error);
    res.status(200).json({ message: "Authentication unsucessful" });
  }
};

module.exports = { createSpreadsheet, authClientRoute, authRedirectRoute };
