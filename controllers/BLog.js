const asyncHandler = require("express-async-handler");
const Blog = require("../models/Blog");

const getBlog = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({});

  if (blogs) {
    res.status(200).json(blogs);
  } else {
    res.status(400);
    throw new Error("Blog not found");
  }
});

const postBLog = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error("Add All Fields");
  }

  const blog = await Blog.create({
    title: title,
    description: description,
    user: req.user.id,
  });

  if (blog) {
    res.status(201).json(blog);
  } else {
    res.status(400);
    throw new Error("Blog not posted, try again");
  }
});

const deleteBlog = asyncHandler(async (req, res) => {
  const deletedBLog = await Blog.findByIdAndDelete(req.params.id);

  if (deletedBLog) {
    res.status(200).json({ message: "BLog deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Couldn't find Blog");
  }
});

const updateBLog = asyncHandler(async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (updatedBlog) {
    res.status(200).json({ message: "BLog Updated successfully" });
  } else {
    res.status(404);
    throw new Error("BLog Not Found");
  }
});

module.exports = { postBLog, getBlog, deleteBlog, updateBLog };
