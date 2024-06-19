require("dotenv").config({ path: "/.env" });
const express = require("express");
const app = express();
app.use([express.json(), express.urlencoded({ extended: true })]);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(process.env.PORT, () =>
  console.log(`The app is running on port: ${process.env.PORT}`)
);
