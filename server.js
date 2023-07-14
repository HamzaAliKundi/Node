const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorHandler");

connectDB();
const app = express();

app.use(cors());
app.use(express.json);
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", require("./routes/Accounts"));

app.get("/api/test", (req, res) => {
  res.json({ message: "Test APi" });
});

app.use(errorHandler);
app.listen(port, () => console.log(`Server Started at : ${port}`));
