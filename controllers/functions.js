require("dotenv").config({ path: "../.env" });
const { service } = require("../config/googleSheetsConfig");

const createSpreadsheetCmd = async () => {
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

const newSheet = createSpreadsheetCmd();
console.log(newSheet);
