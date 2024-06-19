require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();
const authRouter = require("./routes/authRoute");

app.use([express.json(), express.urlencoded({ extended: true })]);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(process.env.PORT, () =>
  console.log(`The app is running on port: ${process.env.PORT}`)
);
