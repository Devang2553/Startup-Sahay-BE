const express = require("express");
const mongoose = require("mongoose");

const app = express();

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
