import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialType = {
  blog: IBlog;
  blogs: IBlog[];
};

const initialState = {
  blog: undefined,
  blogs: [],
} as InitialType;

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchBlog: (state, action: PayloadAction<IBlog>) => {
      state.blog = action.payload;
    },

    fetchBlogs: (state, action: PayloadAction<IBlog[]>) => {
      state.blogs = action.payload;
    },

    addBlog: (state, action: PayloadAction<IBlog>) => {
      state.blogs.push(action.payload);
    },

    updateBlog: (state, action: PayloadAction<IBlog>) => {
      state.blogs = state.blogs.map((blogs) =>
        blogs?._id === action.payload?._id ? action.payload : blogs
      );
    },

    deleteBlog: (state, action: PayloadAction<IBlog>) => {
      state.blogs = state.blogs.filter(
        (blogs) => blogs?._id !== action.payload?._id
      );
    },
  },
});

export const { fetchBlog, fetchBlogs, addBlog, updateBlog, deleteBlog } =
  blogSlice.actions;

const blogReducer = blogSlice.reducer;
export default blogReducer;
