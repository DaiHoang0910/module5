import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddPost = ({ onAdd }) => {
    const [post, setPost] = useState({ title: "", category: "", content: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!post.title || !post.category || !post.content) return;

        const newPost = { ...post, slug: post.title.toLowerCase().replace(/\s+/g, "-"), updatedAt: new Date().toLocaleString() };
        onAdd(newPost);
        navigate("/");
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Title" name="title" value={post.title} onChange={handleChange} required />
            <TextField label="Category" name="category" value={post.category} onChange={handleChange} required />
            <TextField label="Content" name="content" value={post.content} onChange={handleChange} required multiline rows={4} />
            <Button type="submit" variant="contained" color="primary">Submit</Button>
            <Button variant="outlined" color="secondary" onClick={() => navigate("/")}>Return</Button>
        </Box>
    );
};

export default AddPost;
