const User = require('../Model/userModel');
const bcrypt = require('bcrypt');


class UserController {

 static register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).send({ message: 'Password and confirmPassword do not match' });
    }

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).send({ message: 'User with the same email already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    // Save the user to the database
    await user.save();

    res.send({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal server error' });
  }
};
}

module.exports=UserController
