const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./Routes/user");
// const formRouter = require("./Routes/stepformRoute");
const step1Router = require("./Routes/stepone");
const step2Router = require("./Routes/steptwo");


const FacebookStrategy = require("passport-facebook").Strategy;
const session = require("express-session");
const flash = require("connect-flash");
const fbRoute = require("./Routes/fb");

const cors = require("cors");
const passport = require("passport");
const dotenv = require("dotenv");

dotenv.config({
  override: true,
});

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
app.use("/api", fbRoute);

passport.serializeUser((user, done) => {
  console.log(user["_json"]);
  done(
    null,
    user["_json"] || { id: user.id, username: user.username, name: user.name }
  );
});

passport.deserializeUser((id, done) => {
  process.nextTick(() => done(null, id));
});

const { facebookAuthenticate } = require("./auth/authStrategy");

passport.use(facebookAuthenticate());

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
// app.use("/form", formRouter);
app.use("/step1", step1Router);
app.use("/step2", step2Router);




const tokenValidation = require("./Auth/LoginAuthStrategy");

passport.use(tokenValidation());

app.listen(3001, "localhost", () => {
  console.log("server started on port 3001 ");
});
