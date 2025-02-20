import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import { Table, Button } from "react-bootstrap";

const PostList = ({ posts, onDelete }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);

    const handleDelete = (id) => {
        setSelectedPostId(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        onDelete(selectedPostId);
        setShowModal(false);
    };

    return (
        <div>
            <h2 className="text-center">List Posts</h2>
            <Link to="/add" className="btn btn-primary mb-3">Add Post</Link>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Updated At</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {posts.map((post) => (
                    <tr key={post.id}>
                        <td>{post.id}</td>
                        <td><Link to={`/view/${post.id}`}>{post.title}</Link></td>
                        <td>{post.category}</td>
                        <td>{post.updatedAt}</td>
                        <td>
                            <Link to={`/edit/${post.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(post.id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <ConfirmModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default PostList;
