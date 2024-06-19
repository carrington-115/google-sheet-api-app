const { service } = require("../config/googleSheetsConfig");

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
    return spreadsheet.data.spreadsheetId;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { createSpreadsheet };
