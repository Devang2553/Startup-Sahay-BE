const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./Routes/user");
const step1Router = require("./Routes/stepone");
const step2Router = require("./Routes/steptwo");
const cors = require("cors");
const passport = require("passport");
const dotenv = require("dotenv");

dotenv.config({
  override: true,
});

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Contact");
    console.log("database connected...");
  } catch (error) {
    console.log(error);
  }
};
connectDB();

app.use("/users", usersRouter);
app.use("/step1", step1Router);
app.use("/step2", step2Router);

const tokenValidation = require("./Auth/LoginAuthStrategy");

passport.use(tokenValidation());

app.listen(3001, "localhost", () => {
  console.log("server started on port 3001 ");
});
