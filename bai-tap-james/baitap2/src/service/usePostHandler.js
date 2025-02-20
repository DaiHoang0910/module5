import { useState } from "react";
import postsData from "../data/posts.json";
import ToastNotification from "../components/ToastNotification";

const usePostHandler = () => {
    const [posts, setPosts] = useState(postsData || []);

    const getCurrentTimestamp = () => {
        return new Date().toISOString();
    };

    const handleAddPost = (newPost) => {
        const postWithTimestamp = {
            id: posts.length + 1,
            ...newPost,
            updatedAt: getCurrentTimestamp()
        };

        setPosts([...posts, postWithTimestamp]);
        ToastNotification.success(`Post: "${newPost.title}" - added successfully!`);
    };

    const handleEditPost = (updatedPost) => {
        const updatedPostWithTimestamp = {
            ...updatedPost,
            updatedAt: getCurrentTimestamp()
        };

        setPosts(posts.map((post) => (post.id === updatedPost.id ? updatedPostWithTimestamp : post)));
        ToastNotification.info(`Post: "${updatedPost.title}" - updated successfully!`);
    };

    const handleDeletePost = (id) => {
        const deletedPost = posts.find((post) => post.id === id);
        setPosts(posts.filter((post) => post.id !== id));

        if (deletedPost) {
            ToastNotification.error(`Post: "${deletedPost.title}" - deleted successfully!`);
        }
    };

    return { posts, handleAddPost, handleEditPost, handleDeletePost };
};

export default usePostHandler;
