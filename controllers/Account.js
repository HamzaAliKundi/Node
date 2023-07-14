const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Account");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (name === "" || email === "" || password === "") {
    res.status(400).json({
      message: "Please add all required fields",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name,
    email: email,
    password: encryptedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id, user.name, user.email),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email: email });

  if (userExists && (await bcrypt.compare(password, userExists.password))) {
    res.status(200).json({
      _id: userExists.id,
      name: userExists.name,
      email: userExists.email,
      token: generateToken(userExists.id, userExists.name, userExists.email),
    });
  } else {
    res.status(400);
    throw new Error("Invalied User Credientals!");
  }
});

const generateToken = (id, name, email) => {
  return jwt.sign({ id, name, email }, process.env.TOKEN_SECRET_KEY, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
};
