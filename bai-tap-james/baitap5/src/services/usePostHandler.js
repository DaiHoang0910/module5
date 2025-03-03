import { useState, useEffect } from "react";
import { getPosts, deletePost, getCategories, createPost, updatePost as updatePostAPI } from "./api";
import { toast } from "react-toastify";

const usePostHandler = () => {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchPosts();
        fetchCategories();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await getPosts();
            setPosts(response.data);
        } catch (error) {
            toast.error("Lỗi khi tải danh sách bài viết");
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response.data);
        } catch (error) {
            toast.error("Lỗi khi tải danh mục");
        }
    };

    const addPost = async (newPost) => {
        try {
            const response = await createPost(newPost);
            setPosts([...posts, response.data]);
            toast.success("Thêm bài viết thành công!");
        } catch (error) {
            toast.error("Lỗi khi thêm bài viết!");
        }
    };

    const updatePost = async (id, updatedPost) => {
        try {
            await updatePostAPI(id, updatedPost);
            setPosts(posts.map((post) => (post.id === id ? updatedPost : post)));
            toast.success("Cập nhật bài viết thành công!");
        } catch (error) {
            toast.error("Lỗi khi cập nhật bài viết!");
        }
    };

    const handleDeletePost = async (id) => {
        try {
            await deletePost(id);
            setPosts(posts.filter((post) => post.id !== id));
            toast.success("Xóa bài viết thành công!");
        } catch (error) {
            toast.error("Lỗi khi xóa bài viết!");
        }
    };

    return { posts, categories, addPost, updatePost, handleDeletePost };
};

export default usePostHandler;
