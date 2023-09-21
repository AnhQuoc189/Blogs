"use client";

//components
import AppTable from "src/components/Table";

//redux
import { useAppSelector } from "src/redux/hooks";

const BlogsPage = () => {
  const blogs = useAppSelector((state) => state.blog.blogs);

  return (
    <div className="mt-3">
      <AppTable blogs={blogs} />
    </div>
  );
};

export default BlogsPage;
