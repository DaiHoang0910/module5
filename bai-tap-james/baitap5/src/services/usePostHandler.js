import {useState, useEffect} from "react";
import {getPosts, addPost, deletePost, updatePost} from "./api"; // Đảm bảo đường dẫn đúng
import ToastNotification from "../components/ToastNotification";

const usePostHandler = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const getCurrentTimestamp = () => {
        return new Date().toISOString();
    };

    const fetchPosts = async () => {
        try {
            const response = await getPosts();
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
            ToastNotification.error("Failed to load posts!");
        }
    };

    const handleAddPost = async (newPost) => {
        try {
            const response = await getPosts();
            const existingPosts = response.data;

            const maxId = existingPosts
                .map((p) => parseInt(p.id))
                .filter((id) => !isNaN(id))
                .reduce((max, id) => (id > max ? id : max), 0);

            const postWithTimestamp = {
                id: (maxId + 1).toString(),
                ...newPost,
                updatedAt: getCurrentTimestamp(),
                history: [] // Lưu lịch sử chỉnh sửa
            };

            await addPost(postWithTimestamp);
            ToastNotification.success(`Post: "${newPost.title}" - added successfully!`);
            fetchPosts();
        } catch (error) {
            console.error("Error adding post:", error);
            ToastNotification.error("Failed to add post!");
        }
    };

    const handleUpdatePost = async (id, updatedPost) => {
        try {
            const postToUpdate = posts.find(post => post.id === id);
            if (!postToUpdate) {
                ToastNotification.error("Post not found!");
                return;
            }

            // Nếu bài viết chưa có lịch sử, tạo một mảng trống
            const updatedHistory = [
                ...(postToUpdate.history || []),
                {
                    previousTitle: postToUpdate.title,
                    previousCategory: postToUpdate.category,
                    previousContent: postToUpdate.content,
                    updatedAt: getCurrentTimestamp()
                }
            ];

            const postWithHistory = {
                ...postToUpdate, // Giữ nguyên bài viết cũ
                ...updatedPost,  // Cập nhật nội dung mới
                history: updatedHistory, // Lưu lịch sử chỉnh sửa
                updatedAt: getCurrentTimestamp()
            };

            await updatePost(id, postWithHistory);
            ToastNotification.success("Post updated successfully!");
            fetchPosts();
        } catch (error) {
            console.error("Error updating post:", error);
            ToastNotification.error("Failed to update post!");
        }
    };

    const handleDeletePost = async (id) => {
        try {
            await deletePost(id);
            ToastNotification.success("Post deleted successfully!");
            fetchPosts();
        } catch (error) {
            console.error("Error deleting post:", error);
            ToastNotification.error("Failed to delete post!");
        }
    };

    return {posts, handleAddPost, handleDeletePost, handleUpdatePost};
};

export default usePostHandler;
