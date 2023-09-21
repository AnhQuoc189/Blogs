"use client";

import { useState } from "react";
import Link from "next/link";

//components
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import CreateModal from "./Create";
import UpdateModal from "./Update";
import Delete from "./Delete";

//redux
import { useAppDispatch } from "src/redux/hooks";
import { fetchBlog } from "src/redux/slices/blogSlice";

interface IProps {
  blogs: IBlog[];
}

const AppTable: React.FC<IProps> = (props: IProps) => {
  const { blogs } = props;

  const dispatch = useAppDispatch();

  const [blog, setBlog] = useState<IBlog | null>(null);
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  const handleOpenModalEdit = (blog: IBlog) => {
    dispatch(fetchBlog(blog));
    setBlog(blog);
    setShowModalUpdate(true);
  };

  return (
    <>
      <div
        className="mb-3"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h3>Table Blogs</h3>
        <Button variant="secondary" onClick={() => setShowModalCreate(true)}>
          Add New
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((blog: IBlog, index) => {
            return (
              <tr key={blog?._id}>
                <td>{index}</td>
                <td>{blog?.title}</td>
                <td>{blog?.author}</td>
                <td>
                  <Link className="btn btn-primary" href={`blogs/${blog?._id}`}>
                    View
                  </Link>
                  <Button
                    variant="warning"
                    className="mx-3"
                    onClick={() => {
                      handleOpenModalEdit(blog);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setBlog(blog);
                      setShowModalDelete(true);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <CreateModal
        showModalCreate={showModalCreate}
        setShowModalCreate={setShowModalCreate}
      />

      <UpdateModal
        showModalUpdate={showModalUpdate}
        setShowModalUpdate={setShowModalUpdate}
        blog={blog!}
        setBlog={setBlog}
      />

      <Delete
        showModalDelete={showModalDelete}
        setShowModalDelete={setShowModalDelete}
        blog={blog!}
      />
    </>
  );
};

export default AppTable;
