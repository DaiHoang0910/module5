import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Form, Container } from "react-bootstrap";
import useProductHandler from "../services/useProductHandler";

const ProductList = () => {
    const { products, categories } = useProductHandler();
    const [searchName, setSearchName] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInput, setPageInput] = useState("1");
    const productsPerPage = 10;

    const filteredProducts = products.filter((product) => {
        const nameMatch = searchName
            .trim()
            .toLowerCase()
            .split(" ")
            .every(word => product.name.toLowerCase().includes(word));

        const categoryMatch = searchCategory === "" || product.categoryId.toString() === searchCategory;

        return nameMatch && categoryMatch;
    }).sort((a, b) => a.quantity - b.quantity);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage) || 1;

    useEffect(() => {
        if (filteredProducts.length === 0) {
            setCurrentPage(1);
            setPageInput("1");
        }
    }, [filteredProducts.length]);

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
            <h2 className="text-center">List Products</h2>

            <Form className="mb-3 d-flex gap-2">
                <Form.Control
                    type="text"
                    placeholder="Search by name..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <Form.Select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </Form.Select>
                <Button variant="secondary" onClick={() => {
                    setSearchName("");
                    setSearchCategory("");
                }}>
                    Reset
                </Button>
            </Form>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Date</th>
                    <th className="text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{categories.find(cat => cat.id.toString() === product.categoryId.toString())?.name || "Unknown"}</td>
                            <td>{product.quantity}</td>
                            <td>{product.date}</td>
                            <td className="text-center">
                                <Link to={`/edit/${product.id}`} className="btn btn-warning btn-sm">Update</Link>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="text-center">Không tìm thấy sản phẩm</td>
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
        </Container>
    );
};

export default ProductList;