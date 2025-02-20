import React, {useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {Form, Button, Container} from "react-bootstrap";

const EditPost = ({posts, onEdit}) => {
    const {id} = useParams();
    const postToEdit = posts.find((p) => p.id === parseInt(id));
    const [post, setPost] = useState(postToEdit || {title: "", category: "", content: ""});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setPost({...post, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!post.title || !post.category || !post.content) return;

        const updatedPost = {
            ...post,
            slug: post.title.toLowerCase().replace(/\s+/g, "-"),
            updatedAt: new Date().toLocaleString(),
        };

        onEdit(updatedPost);
        navigate("/");
    };

    return (
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
                    <Form.Control
                        type="text"
                        name="category"
                        value={post.category}
                        onChange={handleChange}
                        required
                        placeholder="Enter category"
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
                        Return
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default EditPost;
