import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Form, Container } from "react-bootstrap";
import ConfirmModal from "../components/ConfirmModal";
import usePostHandler from "../services/usePostHandler";

const PostList = () => {
    const { posts, categories, handleDeletePost } = usePostHandler();
    const [showModal, setShowModal] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);

    const [searchTitle, setSearchTitle] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [searchDate, setSearchDate] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [pageInput, setPageInput] = useState("1");
    const postsPerPage = 10;

    const handleDelete = (id) => {
        setSelectedPostId(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        await handleDeletePost(selectedPostId);
        setShowModal(false);
    };

    const filteredPosts = posts.filter((post) => {
        const titleMatch = searchTitle
            .trim()
            .toLowerCase()
            .split(" ")
            .every(word => post.title.toLowerCase().includes(word));

        const categoryMatch = searchCategory === "" || post.categoryId.toString() === searchCategory;
        const dateMatch = searchDate === "" || new Date(post.updatedAt).toISOString().split("T")[0] === searchDate;

        return titleMatch && categoryMatch && dateMatch;
    });

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1;

    useEffect(() => {
        if (filteredPosts.length === 0) {
            setCurrentPage(1);
            setPageInput("1");
        }
    }, [filteredPosts.length]);

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
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
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
                            <td>{categories.find(cat => cat.id.toString() === post.categoryId.toString())?.name || "Unknown"}</td>
                            <td>{new Date(post.updatedAt).toISOString().split("T")[0]}</td>
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

            <div className="pagination-container d-flex align-items-center justify-content-center gap-2">
                <button
                    className="btn btn-outline-primary"
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
                    className="pagination-input text-center"
                    style={{ width: "50px" }}
                />

                <span className="fw-bold">/ {totalPages}</span>

                <button
                    className="btn btn-outline-primary"
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
