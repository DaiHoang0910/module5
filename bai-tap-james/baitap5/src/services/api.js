import axios from "axios";

const API_URL = "http://localhost:5000/posts";

export const getPosts = () => axios.get(API_URL);
export const getPostById = (id) => axios.get(`${API_URL}/${id}`);
export const addPost = (post) => axios.post(API_URL, post);
export const updatePost = (id, updatedPost) => axios.put(`${API_URL}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${API_URL}/${id}`);
export const createPost = (post) => axios.post(API_URL, post);
export const getEditHistory = async () => {
    try {
        const response = await axios.get(API_URL);
        const posts = response.data;
        return posts
            .map(post =>
                post.history?.map(h => ({
                    title: post.title,
                    category: post.category,
                    previousTitle: h.previousTitle,
                    previousCategory: h.previousCategory,
                    previousContent: h.previousContent,
                    updatedAt: h.updatedAt
                }))
            )
            .flat()
            .filter(Boolean);
    } catch (error) {
        console.error("Error fetching edit history:", error);
        return [];
    }
};


