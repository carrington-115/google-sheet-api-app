const { service, oAuthClient } = require("../config/googleSheetsConfig");

const createSpreadsheet = async (req, res, next) => {
  const resource = {
    resource: {
      properties: {
        title: "test spreadsheet",
      },
    },
  };
  try {
    const spreadsheet = await service.spreadsheets.create(resource);
    const sheetId = spreadsheet.data.spreadsheetId;
    res
      .status(200)
      .json({ message: `The spreadsheet was created with id: ${sheetId}` });
  } catch (error) {
    console.error(error);
  }
};

// oauth redirect login
const authRedirectRoute = (req, res) => {
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
    const { token } = await oAuthClient.getToken(code);
    oAuthClient.setCredentials(token);
    res.status(200).json({ message: "Authentication successful" });
  } catch (error) {
    console.error(error);
    res.status(200).json({ message: "Authentication unsucessful" });
  }
};

module.exports = { createSpreadsheet, authClientRoute, authRedirectRoute };
