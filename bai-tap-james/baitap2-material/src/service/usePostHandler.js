import { useState } from "react";
import postsData from "../data/posts.json";
import { showToast } from "../components/ToastNotification";

const usePostHandler = () => {
    const [posts, setPosts] = useState(postsData);

    const handleAddPost = (newPost) => {
        const newPostData = { id: posts.length + 1, ...newPost };
        setPosts([...posts, newPostData]);
        showToast("success", `Post: "${newPost.title}" - added successfully!`);
    };

    const handleEditPost = (updatedPost) => {
        setPosts(posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
        showToast("info", `Post: "${updatedPost.title}" - updated successfully!`);
    };

    const handleDeletePost = (id) => {
        const deletedPost = posts.find((post) => post.id === id);
        setPosts(posts.filter((post) => post.id !== id));
        if (deletedPost) {
            showToast("error", `Post: "${deletedPost.title}" - deleted successfully!`);
        }
    };

    return { posts, handleAddPost, handleEditPost, handleDeletePost };
};

export default usePostHandler;
