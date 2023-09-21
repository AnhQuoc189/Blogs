"use client";

//components
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

//redux
import { useGetBlogQuery } from "src/redux/services/blogApi";

const ViewDetailBlog = ({ params }: { params: { id: string } }) => {
  const { data, isFetching } = useGetBlogQuery(params.id);

  if (isFetching) {
    return <div>loading...</div>;
  }

  return (
    <Card className="text-center">
      <Card.Title>{data?.title}</Card.Title>
      <Card.Body>
        <Card.Text>{data?.content}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Author: {data?.author}</Card.Footer>
    </Card>
  );
};

export default ViewDetailBlog;
