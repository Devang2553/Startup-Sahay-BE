const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const usersRoute = require("./routes/user");
const dotenv = require("dotenv");

dotenv.config({
  override: true,
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  require("express-session")({
    secret: "secret key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", usersRoute);

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

app.listen(3004, "localhost", () => {
  console.log("server started on port 3004 ");
});
