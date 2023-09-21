import express from "express";
const blogRouter = express.Router();
import {
  getBlog,
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

blogRouter.get("/", getBlogs);
blogRouter.get("/:blogId", getBlog);

blogRouter.post("/", createBlog);

blogRouter.put("/:blogId", updateBlog);
blogRouter.delete("/:blogId", deleteBlog);

export default blogRouter;
