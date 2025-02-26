import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import ToastNotification from "../components/ToastNotification";

const AddPost = ({ onAdd, posts }) => {
    const [post, setPost] = useState({ title: "", category: "", content: "" });
    const navigate = useNavigate();

    const categories = posts ? [...new Set(posts.map((post) => post.category))] : [];

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!post.title || !post.category || !post.content) {
            ToastNotification.error("Please enter all the required information!");
            return;
        }

        const newPost = {
            ...post,
            slug: post.title.toLowerCase().replace(/\s+/g, "-"),
            updatedAt: new Date().toLocaleString(),
        };

        onAdd(newPost);
        navigate("/");
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center">Add New Post</h2>
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
                    <Form.Select name="category" value={post.category} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
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
                        Return
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default AddPost;
