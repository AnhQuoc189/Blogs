"use client";

import Link from "next/link";

//components
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

interface CartBlogProp {
  blog: IBlog;
}

const CartBlog: React.FC<CartBlogProp> = (props: CartBlogProp) => {
  const { blog } = props;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Header>Author: {blog?.author}</Card.Header>
      <Card.Body>
        <Card.Title>{blog?.title}</Card.Title>
        <Card.Text className="h-14rem text-justify overflow-hidden overflow-ellipsis">
          {blog?.content}
        </Card.Text>
        <Button variant="primary">
          <Link className="btn btn-primary" href={`blogs/${blog?._id}`}>
            View Detail
          </Link>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CartBlog;
