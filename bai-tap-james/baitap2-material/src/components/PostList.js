import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const PostList = ({ posts, onDelete }) => {
    return (
        <TableContainer component={Paper} sx={{ maxWidth: 900, margin: "auto", mt: 4 }}>
            <Typography variant="h4" align="center" sx={{ my: 2, fontWeight: "bold" }}>
                List Posts
            </Typography>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#343a40" }}>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>TITLE</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>CATEGORY</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>TIME</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>ACTIONS</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {posts.map((post) => (
                        <TableRow key={post.id} hover>
                            <TableCell>{post.id}</TableCell>
                            <TableCell>
                                <Link to={`/view/${post.id}`} style={{ textDecoration: "none", color: "#1976d2", fontWeight: "bold" }}>
                                    {post.title}
                                </Link>
                            </TableCell>
                            <TableCell>{post.category}</TableCell>
                            <TableCell>{post.time}</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                <Link to={`/edit/${post.id}`} style={{ textDecoration: "none", marginRight: "8px" }}>
                                    <Button variant="contained" color="primary" size="small">
                                        Edit
                                    </Button>
                                </Link>
                                <Button variant="contained" color="error" size="small" onClick={() => onDelete(post.id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PostList;
