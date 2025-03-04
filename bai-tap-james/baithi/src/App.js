import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import EditProduct from "./components/UpdateProduct";
import ProductList from "./components/ProductList";
import useProductHandler from "./services/useProductHandler";

const App = () => {
    const { products, updateProduct} = useProductHandler();

    return (
        <Router>
            <div className="container mt-4">
                <ToastContainer position="top-right" autoClose={3000} />
                <Routes>
                    <Route path="/" element={<ProductList products={products}/>} />
                    <Route path="/edit/:id" element={<EditProduct products={products} onEdit={updateProduct} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;