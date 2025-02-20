import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import { Table, Button, Form } from "react-bootstrap";

const PostList = ({ posts, onDelete }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);

    const [searchTitle, setSearchTitle] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [searchDate, setSearchDate] = useState("");

    const categories = [...new Set(posts.map((post) => post.category))];


    const handleDelete = (id) => {
        setSelectedPostId(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        onDelete(selectedPostId);
        setShowModal(false);
    };

    const filteredPosts = posts.filter((post) => {
        return (
            (searchTitle === "" || post.title.toLowerCase().includes(searchTitle.toLowerCase())) &&
            (searchCategory === "" || post.category === searchCategory) &&
            (searchDate === "" || post.updatedAt.startsWith(searchDate))
        );
    });

    return (
        <div>
            <h2 className="text-center">List Posts</h2>

            <Form className="mb-3 d-flex gap-2">
                <Form.Control
                    type="text"
                    placeholder="Search by title..."
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                />
                <Form.Select className="me-2" value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </Form.Select>
                <Form.Control
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                />
                <Button variant="secondary" onClick={() => { setSearchTitle(""); setSearchCategory(""); setSearchDate(""); }}>
                    Reset
                </Button>
            </Form>

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
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td><Link to={`/view/${post.id}`}>{post.title}</Link></td>
                            <td>{post.category}</td>
                            <td>{new Date(post.updatedAt).toLocaleString()}</td>

                            <td>
                                <Link to={`/edit/${post.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(post.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="text-center">No matching posts found</td>
                    </tr>
                )}
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
