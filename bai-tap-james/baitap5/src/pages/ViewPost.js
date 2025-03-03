import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Spinner } from "react-bootstrap";
import usePostHandler from "../services/usePostHandler";
import ToastNotification from "../components/ToastNotification";

const ViewPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { posts, categories } = usePostHandler();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (posts.length > 0) {
            const foundPost = posts.find((p) => String(p.id) === String(id));
            if (!foundPost) {
                ToastNotification.error("Bài viết không tồn tại hoặc đã bị xóa!");
                navigate("/");
            } else {
                setPost(foundPost);
            }
            setLoading(false);
        }
    }, [posts, id, navigate]);

    const getCategoryName = (categoryId) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category ? category.name : "Không xác định";
    };

    if (loading) {
        return (
            <Container className="text-center mt-4">
                <Spinner animation="border" />
                <p>Đang tải...</p>
            </Container>
        );
    }

    return post ? (
        <Container className="mt-4">
            <h2>{post.title}</h2>
            <p><strong>Category:</strong> {getCategoryName(post.categoryId)}</p>
            <p><strong>Update At:</strong> {post.updatedAt ? new Date(post.updatedAt).toLocaleString() : "Chưa có thông tin"}</p>
            <hr />
            <p>{post.content}</p>
            <Button variant="secondary" onClick={() => navigate("/")}>
                Return
            </Button>
        </Container>
    ) : (
        <Container className="text-center mt-4">
            <p>Not found...</p>
            <Button variant="secondary" onClick={() => navigate("/")}>
                Return
            </Button>
        </Container>
    );
};

export default ViewPost;
