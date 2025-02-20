import React from "react";
import { Card, CardContent, CardActions, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
    return (
        <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: "bold", mb: 1 }}>
                    {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {post.category} - {post.updatedAt}
                </Typography>
                <Typography variant="body2" sx={{ color: "#555" }}>
                    {post.content.substring(0, 100)}...
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    component={Link}
                    to={`/post/${post.slug}`}
                    variant="contained"
                    size="small"
                    color="primary"
                    sx={{ ml: 1, textTransform: "none" }}
                >
                    Xem chi tiết
                </Button>
            </CardActions>
        </Card>
    );
};

export default PostItem;
