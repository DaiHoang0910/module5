import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const ViewPost = ({ posts }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const post = posts.find((p) => p.id === parseInt(id));

    return post ? (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
                Return
            </button>
        </div>
    ) : (
        <p>Post not found</p>
    );
};

export default ViewPost;
