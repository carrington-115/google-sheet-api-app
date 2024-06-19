const { readFileSync, writeFileSync } = require("fs");
const dotenv = require("dotenv");

const envDataParser = (secrets) => {
  const location = "./.env";
  const envContent = readFileSync(location, "utf8");
  const envVars = dotenv.parse(envContent);
  for (let key in secrets) {
    envVars[key] = secrets[key];
  }
  const updatedEnvData = Object.entries(envVars)
    .map(([j, k]) => `${j}=${k}`)
    .join("\n");
  writeFileSync(location, updatedEnvData);
};

module.exports = { envDataParser };
