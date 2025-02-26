import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Spinner } from "react-bootstrap";
import { getPostById } from "../services/api";
import ToastNotification from "../components/ToastNotification";

const ViewPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = async () => {
        try {
            const response = await getPostById(id);
            setPost(response.data);
        } catch (error) {
            console.error("Error fetching post:", error);
            ToastNotification.error("Failed to load post!");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Container className="text-center mt-4">
                <Spinner animation="border" />
                <p>Loading...</p>
            </Container>
        );
    }

    return post ? (
        <Container className="mt-4">
            <h2>{post.title}</h2>
            <p><strong>Category:</strong> {post.category}</p>
            <p><strong>Updated At:</strong> {new Date(post.updatedAt).toLocaleString()}</p>
            <hr />
            <p>{post.content}</p>
            <Button variant="secondary" onClick={() => navigate("/")}>
                Return
            </Button>
        </Container>
    ) : (
        <Container className="text-center mt-4">
            <p>Post not found</p>
            <Button variant="secondary" onClick={() => navigate("/")}>
                Return
            </Button>
        </Container>
    );
};

export default ViewPost;
