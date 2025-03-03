import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import usePostHandler from "../services/usePostHandler";
import ToastNotification from "../components/ToastNotification";

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { posts, categories, updatePost } = usePostHandler();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newCategory, setNewCategory] = useState("");
    const [useNewCategory, setUseNewCategory] = useState(false);

    useEffect(() => {
        const existingPost = posts.find((p) => p.id === id);
        if (existingPost) {
            setPost(existingPost);
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [id, posts]);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!post.title || (!post.categoryId && !newCategory) || !post.content) {
            ToastNotification.error("Please enter all required fields!");
            return;
        }

        const updatedPost = {
            ...post,
            categoryId: useNewCategory ? newCategory : post.categoryId,
            slug: post.title.toLowerCase().replace(/\s+/g, "-"),
            updatedAt: new Date().toISOString(),
        };

        await updatePost(id, updatedPost);
        navigate("/");
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
            <h2 className="text-center">Edit Post</h2>
            <Form onSubmit={handleSubmit} className="mt-3">
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                        required
                        placeholder="Enter post title"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Check
                        type="radio"
                        label="Select existing category"
                        checked={!useNewCategory}
                        onChange={() => setUseNewCategory(false)}
                    />
                    <Form.Select
                        name="categoryId"
                        value={post.categoryId}
                        onChange={handleChange}
                        disabled={useNewCategory}
                        required
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        name="content"
                        value={post.content}
                        onChange={handleChange}
                        required
                        placeholder="Enter post content"
                    />
                </Form.Group>

                <div>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button variant="secondary" className="ms-2" onClick={() => navigate("/")}>
                        Cancel
                    </Button>
                </div>
            </Form>
        </Container>
    ) : (
        <Container className="text-center mt-4">
            <p>Post not found</p>
            <Button variant="secondary" onClick={() => navigate("/")}>Return</Button>
        </Container>
    );
};

export default EditPost;
