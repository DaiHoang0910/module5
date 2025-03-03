import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Form, Button, Container} from "react-bootstrap";
import usePostHandler from "../services/usePostHandler";
import ToastNotification from "../components/ToastNotification";

const AddPost = () => {
    const {posts, categories, addPost} = usePostHandler();
    const [post, setPost] = useState({title: "", categoryId: "", content: ""});
    const [newCategory] = useState("");
    const [useNewCategory, setUseNewCategory] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setPost({...post, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!post.title || (!post.categoryId && !newCategory) || !post.content) {
            ToastNotification.error("Please enter all required fields!");
            return;
        }

        const maxId = posts.length > 0 ? Math.max(...posts.map((p) => parseInt(p.id, 10))) : 0;
        let categoryId = post.categoryId;

        if (useNewCategory) {
            const newCategoryObj = {id: (categories.length + 1).toString(), name: newCategory};
            categoryId = newCategoryObj.id;
        }

        const newPost = {
            id: (maxId + 1).toString(),
            title: post.title,
            categoryId,
            content: post.content,
            slug: post.title.toLowerCase().replace(/\s+/g, "-"),
            updatedAt: new Date().toISOString(),
        };

        await addPost(newPost);
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
                        <option value="">Select Category</option>
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
    );
};

export default AddPost;
