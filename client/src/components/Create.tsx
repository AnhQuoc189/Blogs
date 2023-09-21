"use client";

import React, { useState } from "react";

//components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";

//redux
import { useCreateBlogMutation } from "src/redux/services/blogApi";
import { useAppDispatch } from "src/redux/hooks";
import { addBlog } from "src/redux/slices/blogSlice";

//animation
import { motion } from "framer-motion";

interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (value: boolean) => void;
}

const CreateModal: React.FC<IProps> = (props: IProps) => {
  const { showModalCreate, setShowModalCreate } = props;

  const dispatch = useAppDispatch();

  const [createBlog, { isLoading }] = useCreateBlogMutation();
  const [formBlog, setFormBlog] = useState({
    title: "",
    author: "",
    content: "",
  });

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormBlog({ ...formBlog, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const { data, error }: any = await createBlog(formBlog);
    if (data) {
      dispatch(addBlog(data));
      setShowModalCreate(false);
      toast.success("Create succeed");
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
  };

  const dropIn = {
    hidden: {
      y: "-100vh",
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  return (
    <motion.div variants={dropIn}>
      <Modal
        show={showModalCreate}
        onHide={() => setShowModalCreate(false)}
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
                name="title"
                type="text"
                placeholder="Enter Title..."
                onChange={handleChangeForm}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                name="author"
                type="text"
                placeholder="Enter Author..."
                onChange={handleChangeForm}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                name="content"
                as="textarea"
                rows={3}
                onChange={handleChangeForm}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalCreate(false)}>
            Close
          </Button>
          {isLoading ? (
            <Spinner animation="border" />
          ) : (
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </motion.div>
  );
};

export default CreateModal;
