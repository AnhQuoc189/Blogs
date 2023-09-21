"use client";

import { useEffect, useState } from "react";

//component
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

//redux
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { useUpdateBlogMutation } from "src/redux/services/blogApi";
import { updateBlog } from "src/redux/slices/blogSlice";

interface IProps {
  showModalUpdate: boolean;
  setShowModalUpdate: (value: boolean) => void;
  blog: IBlog;
  setBlog: (value: IBlog) => void;
}

type CheckChange = {
  title: boolean;
  author: boolean;
  content: boolean;
};

const initChange = {
  title: false,
  author: false,
  content: false,
} as CheckChange;

const UpdateModal: React.FC<IProps> = (props: IProps) => {
  const { showModalUpdate, setShowModalUpdate, blog, setBlog } = props;

  const blogCurrent = useAppSelector((state) => state.blog.blog);

  const [changed, setChange] = useState<CheckChange>(initChange);

  const dispatch = useAppDispatch();
  const [update] = useUpdateBlogMutation();

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "title":
        setChange({
          ...changed,
          title: e.target.value === blogCurrent?.title ? false : true,
        });
        break;

      case "author":
        setChange({
          ...changed,
          author: e.target.value === blogCurrent?.author ? false : true,
        });
        break;

      case "content":
        setChange({
          ...changed,
          content: e.target.value === blogCurrent?.content ? false : true,
        });
      default:
        break;
    }

    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (changed.title || changed.content || changed.author) {
      const { data, error }: any = await update({
        blogId: blog?._id!,
        formData: blog,
      });
      if (data) {
        dispatch(updateBlog(data));
        setChange(initChange);
        setShowModalUpdate(false);
        toast.success("update Succeed");
      }
      if (error) {
        const { data }: any = error;
        switch (data.message) {
          case "Blog already exists":
            toast.error("Blog already exists");
            break;
          case "All fields are mandatory!":
            toast.error("Please fill full information");
            break;
          default:
            break;
        }
      }
    } else {
      toast.error("The information has not been changed");
    }
  };

  const handleCloseModalUpdate = () => {
    setChange(initChange);
    setShowModalUpdate(false);
  };

  return (
    <>
      <Modal
        show={showModalUpdate}
        onHide={handleCloseModalUpdate}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New A Blogs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={blog?.title}
                name="title"
                type="text"
                placeholder="Enter Title..."
                onChange={handleChangeForm}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                value={blog?.author}
                name="author"
                type="text"
                placeholder="Enter Author..."
                onChange={handleChangeForm}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                value={blog?.content}
                name="content"
                as="textarea"
                rows={3}
                onChange={handleChangeForm}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalUpdate}>
            Close
          </Button>
          <Button
            variant={
              changed.author || changed.content || changed.title
                ? "primary"
                : "secondary"
            }
            onClick={handleUpdate}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateModal;
