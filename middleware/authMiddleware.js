const jwt = require("jsonwebtoken");
const User = require("../models/Account");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
      req.user = await User.findById(decode.id).select("-password");
      next();
    }
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized");
  }
  if (!token) {
    res.json(401);
    throw new Error("Not authorized, no token available");
  }
});

module.exports = { protect };
