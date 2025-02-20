import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const EditPost = ({ posts, onEdit }) => {
    const { id } = useParams();
    const postToEdit = posts.find((p) => p.id === parseInt(id));
    const [post, setPost] = useState(postToEdit || { title: "", category: "", content: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
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
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Edit Post
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                    label="Title"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    label="Category"
                    name="category"
                    value={post.category}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    label="Content"
                    name="content"
                    value={post.content}
                    onChange={handleChange}
                    required
                    multiline
                    rows={5}
                    fullWidth
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button variant="contained" color="primary" type="submit">
                        Update
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => navigate("/")}>
                        Return
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default EditPost;
