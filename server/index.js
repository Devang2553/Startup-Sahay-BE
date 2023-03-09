const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./Routes/user");
const cors = require("cors");
const passport = require("passport");
const fbRoute = require("./Routes/fb");
const dotenv = require("dotenv");

dotenv.config({
    override: true,
  });

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(
    require("express-session")({
      secret: "secret key",
      resave: false,
      saveUninitialized: false,
    })
  );

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", fbRoute);

const { facebookAuthenticate } = require("./auth/authStrategy");

passport.use(facebookAuthenticate());

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    console.log(user["_json"]);
    cb(
      null,
      user["_json"] || { id: user.id, username: user.username, name: user.name }
    );
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => cb(null, user));
});

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

const tokenValidation = require("./Auth/LoginAuthStrategy");

passport.use(tokenValidation());

app.listen(3001, "localhost", () => {
  console.log("server started on port 3001 ");
});
