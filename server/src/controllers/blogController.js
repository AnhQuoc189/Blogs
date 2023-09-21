import mongoose from "mongoose";
import constants from "../constants/httpStatus.js";
import Blog from "../models/blogModel.js";
import asyncHandler from "express-async-handler";

const getBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(constants.OK).json(blogs);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
    throw new Error(error);
  }
});

const getBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId);
    res.status(constants.OK).json(blog);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
    throw new Error(error);
  }
});

const createBlog = asyncHandler(async (req, res) => {
  const { title, author, content } = req.body;

  const existBlogTitle = await Blog.findOne({ title });
  if (existBlogTitle) {
    res.status(constants.UNPROCESSABLE_ENTITY);
    throw new Error("Blog already exists");
  }

  if (!title || !author || !content) {
    res.status(constants.NOT_FOUND);
    throw new Error("All fields are mandatory!");
  }

  const blogCreate = new Blog({
    title,
    author,
    content,
  });

  try {
    const blog = await blogCreate.save();
    res.status(constants.CREATE).json(blog);
  } catch (error) {
    console.log(error);
    res.status(constants.BAD_REQUEST).json({ message: error.message });
  }
});

const updateBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return res.status(constants.NOT_FOUND).json(`No blog with id: ${blogId}`);
  }

  const { title, author, content } = req.body;

  if (!title || !author || !content) {
    res.status(constants.NOT_FOUND);
    throw new Error("All fields are mandatory!");
  }

  const newBlog = new Blog({
    _id: blogId,
    title,
    author,
    content,
  });

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, newBlog, {
      new: true,
    });
    res.status(constants.OK).json(updatedBlog);
  } catch (error) {
    console.log(error);
    res.status(constants.BAD_REQUEST).json({ message: error.message });
  }
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return res.status(constants.NOT_FOUND).send(`No blog with id: ${blogId}`);
  }

  try {
    await Blog.findByIdAndRemove(blogId);
    res.status(constants.OK).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(constants.SERVER_ERROR).json({ message: error.message });
  }
});

export { getBlog, getBlogs, createBlog, updateBlog, deleteBlog };
