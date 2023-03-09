const User = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");

const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const id = uuidv4();

const SECRET_KEY = "registerApi";

const app = express();
app.use(express.json());
class UserController {
  static register = async (req, res) => {
    try {
      const { name, email, password, confirmPassword } = req.body;

      // Check if all fields are provided
      if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Check if password and confirmPassword match
      if (password !== confirmPassword) {
        return res
          .status(400)
          .json({ message: "Password and confirmPassword do not match" });
      }

      // Check if user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(409)
          .json({ message: "User with the same email already exists" });
      }

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create a new user
      const user = new User({
        // id:uuidv4(),
        name,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY);
      // Save the user to the database
      await user.save();
      return res.status(201).json({
        user: user,
        token: token,
        message: "User registered successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static login = async (req, res) => {
    const { email, password } = req.body.data;
    console.log(req.body.data);

    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    // Update user info in database
    user.lastLogin = new Date();
    await user.save();

    // Store token in local storage
    // localStorage.setItem('accessToken', token);

    res.status(200).json({ message: "Login successful", token });
  };
}

module.exports = UserController;
