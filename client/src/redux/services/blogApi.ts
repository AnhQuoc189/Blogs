import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API } from "../api";

export const apiBlog = createApi({
  reducerPath: "apiBlog",
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  // keepUnusedDataFor: 20,
  endpoints: (builder) => ({
    getBlogs: builder.query<IBlog[], void>({
      query: () => ({
        url: "api/blog",
        method: "GET",
      }),
    }),

    getBlog: builder.query<IBlog, string>({
      query: (blogId) => ({
        url: `api/blog/${blogId}`,
        method: "GET",
      }),
    }),

    createBlog: builder.mutation<IBlog, Omit<IBlog, "id">>({
      query: (formData) => ({
        url: "api/blog",
        method: "POST",
        body: formData,
      }),
    }),

    updateBlog: builder.mutation<IBlog, { blogId: string; formData: IBlog }>({
      query: (data) => ({
        url: `api/blog/${data.blogId}`,
        method: "PUT",
        body: data.formData,
      }),
    }),

    deleteBlog: builder.mutation<{}, string>({
      query: (blogId) => ({
        url: `api/blog/${blogId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = apiBlog;
