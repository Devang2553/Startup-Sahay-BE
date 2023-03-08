const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./Routes/user');

const app = express();
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

app.use('/users', usersRouter);





app.listen(3004, "localhost", () => {
  console.log("server started on port 3004 ");
});
