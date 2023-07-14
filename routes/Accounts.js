const express = require("express");
const router = express.Router();
const { registerUser, getRoute } = require("../controllers/Account");

router.post("/register", registerUser);
router.get("/get", getRoute);

module.exports = router;
