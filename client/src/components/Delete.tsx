"use client";

//components
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

//redux
import { useAppDispatch } from "src/redux/hooks";
import { useDeleteBlogMutation } from "src/redux/services/blogApi";
import { deleteBlog } from "src/redux/slices/blogSlice";

interface IProps {
  showModalDelete: boolean;
  setShowModalDelete: (value: boolean) => void;
  blog: IBlog;
}

const Example: React.FC<IProps> = (props: IProps) => {
  const { showModalDelete, setShowModalDelete, blog } = props;

  const dispatch = useAppDispatch();

  const [removeBlog, { isLoading, error }] = useDeleteBlogMutation();

  const handleDelete = async (blogId: string) => {
    const { data }: any = await removeBlog(blogId);
    if (data) {
      dispatch(deleteBlog(blog));
      setShowModalDelete(false);
      toast.success("Delete succeed");
    }
  };

  return (
    <Modal
      show={showModalDelete}
      onHide={() => setShowModalDelete(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{blog?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Do you want to delete this blog ?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModalDelete(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => handleDelete(blog?._id!)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Example;
