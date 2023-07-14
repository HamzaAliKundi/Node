const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getBlog,
  postBLog,
  deleteBlog,
  updateBLog,
} = require("../controllers/BLog");

router.get("/", protect, getBlog);
router.post("/post", protect, postBLog);
router.delete("/delete/:id", protect, deleteBlog);
router.put("/update", protect, updateBLog);

module.exports = router;
