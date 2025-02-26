import React from "react";
import { Card } from "react-bootstrap";

const PostItem = ({ post }) => {
    return (
        <div className="col-md-4 mb-3">
            <Card>
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        {post.category} - {post.updatedAt}
                    </Card.Subtitle>
                    <Card.Text>{post.content.substring(0, 100)}...</Card.Text>
                    <a href={`/post/${post.slug}`} className="btn btn-primary">
                        Xem chi tiết
                    </a>
                </Card.Body>
            </Card>
        </div>
    );
};

export default PostItem;
