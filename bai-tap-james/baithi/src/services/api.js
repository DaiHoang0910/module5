import axios from "axios";

const API_URL = "http://localhost:5000/product";

export const getProducts = () => axios.get(API_URL);

export const getCategories = () => axios.get("http://localhost:5000/categories");

export const updateProduct = (id, updatedProduct) => axios.put(`${API_URL}/${id}`, updatedProduct);
