const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorHandler");

connectDB();
const app = express();

app.use(cors());
app.use(express.json);
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", require("./routes/Accounts"));

app.use(errorHandler);
app.listen(port, () => console.log(`Server Started at : ${port}`));
