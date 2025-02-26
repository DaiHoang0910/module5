import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import { getPostById, updatePost, getPosts } from "../services/api";
import ToastNotification from "../components/ToastNotification";

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [useNewCategory, setUseNewCategory] = useState(false);

    useEffect(() => {
        fetchPost();
        fetchCategories();
    }, []);

    const fetchPost = async () => {
        try {
            const response = await getPostById(id);
            setPost(response.data);
        } catch (error) {
            console.error("Error fetching post:", error);
            ToastNotification.error("Failed to load post!");
            navigate("/");
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await getPosts();
            const uniqueCategories = [...new Set(response.data.map((post) => post.category))];
            setCategories(uniqueCategories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!post.title || (!post.category && !newCategory) || !post.content) {
            ToastNotification.error("Please enter all required fields!");
            return;
        }

        const updatedPost = {
            ...post,
            category: useNewCategory ? newCategory : post.category,
            slug: post.title.toLowerCase().replace(/\s+/g, "-"),
            updatedAt: new Date().toISOString(),
        };

        try {
            await updatePost(id, updatedPost);
            ToastNotification.success("Post updated successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error updating post:", error);
            ToastNotification.error("Failed to update post!");
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
                        name="category"
                        value={post.category}
                        onChange={handleChange}
                        disabled={useNewCategory}
                        required
                    >
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </Form.Select>

                    <Form.Check
                        type="radio"
                        label="Enter new category"
                        checked={useNewCategory}
                        onChange={() => setUseNewCategory(true)}
                    />
                    <Form.Control
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        disabled={!useNewCategory}
                        placeholder="Enter new category"
                        required={useNewCategory}
                    />
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
            <Button variant="secondary" onClick={() => navigate("/")}>
                Return
            </Button>
        </Container>
    );
};

export default EditPost;
