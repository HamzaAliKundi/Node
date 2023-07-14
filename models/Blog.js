const mongoose = require("mongoose");

const Blog = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BLog", Blog);
