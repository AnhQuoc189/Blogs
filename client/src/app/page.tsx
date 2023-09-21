"use client";

import { useEffect } from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Home Page",
  description: "Description bla bla",
};

//components
import CartBlog from "src/components/CardBlog";
import SkeletonPost from "src/components/Skeleton";

//redux
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { useGetBlogsQuery } from "src/redux/services/blogApi";
import { fetchBlogs } from "src/redux/slices/blogSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const { data, isFetching } = useGetBlogsQuery();

  useEffect(() => {
    if (data) {
      dispatch(fetchBlogs(data));
    }
  }, [data]);

  const blogs = useAppSelector((state) => state.blog.blogs);

  return (
    <div className="flex flex-1 py-5 flex-row flex-wrap gap-y-5 gap-x-5">
      {isFetching && <SkeletonPost />}
      {blogs?.map((blog: IBlog) => <CartBlog key={blog?._id} blog={blog} />)}
    </div>
  );
};

export default Home;
