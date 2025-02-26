import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Form, Container } from "react-bootstrap";
import ConfirmModal from "../components/ConfirmModal";
import { getPosts, deletePost } from "../services/api";
import ToastNotification from "../components/ToastNotification";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);

    const [searchTitle, setSearchTitle] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [searchDate, setSearchDate] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [pageInput, setPageInput] = useState("1");
    const postsPerPage = 10;

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await getPosts();
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const handleDelete = (id) => {
        setSelectedPostId(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            await deletePost(selectedPostId);
            ToastNotification.success("Post deleted successfully!");
            fetchPosts();
            setShowModal(false);
        } catch (error) {
            console.error("Error deleting post:", error);
            ToastNotification.error("Failed to delete post!");
        }
    };

    const filteredPosts = posts.filter((post) => {
        return (
            (searchTitle === "" || post.title.toLowerCase().includes(searchTitle.toLowerCase())) &&
            (searchCategory === "" || post.category === searchCategory) &&
            (searchDate === "" || post.updatedAt.startsWith(searchDate))
        );
    });

    const categories = [...new Set(posts.map((post) => post.category))];

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1;

    const handlePageChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setPageInput(value);
        }
    };

    const handlePageSubmit = (e) => {
        if (e.key === "Enter") {
            let pageNumber = parseInt(pageInput, 10);

            if (isNaN(pageNumber) || pageNumber < 1) {
                pageNumber = 1;
            } else if (pageNumber > totalPages) {
                pageNumber = totalPages;
            }

            setCurrentPage(pageNumber);
            setPageInput(pageNumber.toString());
        }
    };

    return (
        <Container>
            <h2 className="text-center">List Posts</h2>

            <Form className="mb-3 d-flex gap-2">
                <Form.Control
                    type="text"
                    placeholder="Search by title..."
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                />
                <Form.Select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
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
                <Button variant="secondary" onClick={() => {
                    setSearchTitle("");
                    setSearchCategory("");
                    setSearchDate("");
                }}>
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
                    <th className="text-center" colSpan={2}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentPosts.length > 0 ? (
                    currentPosts.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td><Link to={`/view/${post.id}`}>{post.title}</Link></td>
                            <td>{post.category}</td>
                            <td>{new Date(post.updatedAt).toLocaleString()}</td>
                            <td className="text-center">
                                <Link to={`/edit/${post.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                            </td>
                            <td className="text-center">
                                <Button variant="danger" size="sm" onClick={() => handleDelete(post.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="text-center">No matching posts found</td>
                    </tr>
                )}
                </tbody>
            </Table>

            <div className="pagination-container">
                <button
                    onClick={() => {
                        setCurrentPage((prev) => Math.max(prev - 1, 1));
                        setPageInput((prev) => (Math.max(parseInt(prev, 10) - 1, 1)).toString());
                    }}
                    disabled={currentPage === 1}
                >
                    ◀
                </button>

                <input
                    type="text"
                    value={pageInput}
                    onChange={handlePageChange}
                    onKeyDown={handlePageSubmit}
                    className="pagination-input"
                />

                <span className="page-count">/ {totalPages}</span>

                <button
                    onClick={() => {
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                        setPageInput((prev) => (Math.min(parseInt(prev, 10) + 1, totalPages)).toString());
                    }}
                    disabled={currentPage === totalPages}
                >
                    ▶
                </button>
            </div>

            <ConfirmModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onConfirm={confirmDelete}
            />
        </Container>
    );
};

export default PostList;
