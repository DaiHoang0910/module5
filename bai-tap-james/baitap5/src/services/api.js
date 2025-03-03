import axios from "axios";

const API_URL = "http://localhost:5000/posts";

export const getPosts = () => axios.get(API_URL);

export const getCategories = () => axios.get("http://localhost:5000/categories");

export const getPostById = (id) => axios.get(`${API_URL}/${id}`);

export const updatePost = (id, updatedPost) => axios.put(`${API_URL}/${id}`, updatedPost);

export const createPost = (post) => axios.post(API_URL, post);

export const deletePost = (id) => axios.delete(`${API_URL}/${id}`);
