require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();
const authRouter = require("./routes/authRoute");
const operationsRouter = require("./routes/operationsRoute");

app.use([express.json(), express.urlencoded({ extended: true })]);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/ops", operationsRouter);

app.listen(process.env.PORT, () =>
  console.log(`The app is running on port: ${process.env.PORT}`)
);
