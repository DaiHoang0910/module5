import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";

const ViewPost = ({ posts }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const post = posts.find((p) => p.id === parseInt(id));

    return post ? (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                {post.title}
            </Typography>
            <Typography variant="body1" paragraph>
                {post.content}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button variant="contained" color="primary" onClick={() => navigate("/")}>
                    Return
                </Button>
            </Box>
        </Container>
    ) : (
        <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="h6" color="error">
                Post not found
            </Typography>
            <Box sx={{ mt: 2 }}>
                <Button variant="contained" color="secondary" onClick={() => navigate("/")}>
                    Back to Home
                </Button>
            </Box>
        </Container>
    );
};

export default ViewPost;
