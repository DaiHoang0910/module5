import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import useProductHandler from "../services/useProductHandler";
import ToastNotification from "./ToastNotification";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { products, categories, updateProduct } = useProductHandler();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const existingProduct = products.find((p) => p.id === id);
        if (existingProduct) {
            setProduct({
                ...existingProduct,
                date: existingProduct.date.split("/").reverse().join("-"),
            });
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [id, products]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!product.name || !product.categoryId || !product.quantity || !product.date) {
            ToastNotification.error("Please enter all required fields!");
            return;
        }

        if (product.name.length > 100) {
            ToastNotification.error("Product name must not exceed 100 characters!");
            return;
        }

        if (!Number.isInteger(Number(product.quantity)) || product.quantity <= 0) {
            ToastNotification.error("Quantity must be a positive integer!");
            return;
        }

        const selectedDate = new Date(product.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate > today) {
            ToastNotification.error("Entry date cannot be in the future!");
            return;
        }

        const updatedProduct = {
            ...product,
            date: product.date.split("-").reverse().join("/"),
        };

        await updateProduct(id, updatedProduct);
        navigate("/");
    };

    if (loading) {
        return (
            <Container className="text-center mt-4">
                <Spinner animation="border" />
                <p>Loading...</p>
            </Container>
        );
    }

    return product ? (
        <Container className="mt-4">
            <h2 className="text-center">Edit Product</h2>
            <Form onSubmit={handleSubmit} className="mt-3">
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter product name"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                        name="categoryId"
                        value={product.categoryId}
                        onChange={handleChange}
                        required
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        required
                        placeholder="Enter product quantity"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Entry Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="date"
                        value={product.date}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <div>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button variant="secondary" className="ms-2" onClick={() => navigate("/")}>Cancel</Button>
                </div>
            </Form>
        </Container>
    ) : (
        <Container className="text-center mt-4">
            <p>Product not found</p>
            <Button variant="secondary" onClick={() => navigate("/")}>Return</Button>
        </Container>
    );
};

export default EditProduct;
