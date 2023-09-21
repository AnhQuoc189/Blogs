import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, unique: true },

  author: {
    type: String,
  },

  content: {
    type: String,
  },
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
