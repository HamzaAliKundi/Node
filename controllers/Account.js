const asyncHandler = require("express-async-handler");
const User = require("../models/Account");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (name === "" || email === "" || password === "") {
    res.status(400).json({
      message: "Please add all required fields",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  await User.create({
    name: name,
    email: email,
    password: encryptedPassword,
  })
    .then((user) => {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id, user.name, user.email),
      });
    })
    .catch((error) => {
      res.status(400);
      throw new Error("Invalid user data !");
    });
});

const generateToken = (id, name, email) => {
  return jwt.sign({ id, name, email }, process.env.TOKEN_SECRET_KEY, {
    epiresIn: "30d",
  });
};

module.exports = {
  registerUser,
};
