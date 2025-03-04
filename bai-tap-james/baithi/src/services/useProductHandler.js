import { useState, useEffect } from "react";
import { getProducts, getCategories, updateProduct as updateProductAPI } from "./api";
import { toast } from "react-toastify";

const useProductHandler = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response.data);
        } catch (error) {
            toast.error("Error loading the product list!");
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response.data);
        } catch (error) {
            toast.error("Error loading the category");
        }
    };

    const updateProduct = async (id, updatedProduct) => {
        try {
            await updateProductAPI(id, updatedProduct);
            setProducts(products.map((product) => (product.id === id ? updatedProduct : product)));
            toast.success("Product updated successfully!");
        } catch (error) {
            toast.error("Error when updating product!");
        }
    };

    return { products, categories, updateProduct };
};

export default useProductHandler;