import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {Button} from "react-bootstrap";

const ViewPost = ({ posts }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const post = posts.find((p) => p.id === parseInt(id));

    return post ? (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <div>
                <Button variant="secondary" onClick={() => navigate("/")}>
                    Return
                </Button>
            </div>
        </div>
    ) : (
        <p>Post not found</p>
    );
};

export default ViewPost;
