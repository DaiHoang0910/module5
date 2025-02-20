import React, { useEffect, useState } from "react";
import postsData from "../data/posts.json";
import "bootstrap/dist/css/bootstrap.min.css";

const BlogTable = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts(postsData);
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="text-center fw-bold mb-3">List Posts</h2>
            <table className="table table-bordered">
                <thead className="bg-dark text-white">
                <tr>
                    <th className="py-2 text-center fw-bold text-uppercase">ID</th>
                    <th className="py-2 text-start fw-bold text-uppercase">Title</th>
                    <th className="py-2 text-center fw-bold text-uppercase">Category</th>
                    <th className="py-2 text-center fw-bold text-uppercase">Time</th>
                </tr>
                </thead>
                <tbody>
                {posts.map((post, index) => (
                    <tr key={post.slug} className="border-bottom">
                        <td className="text-center">{index + 1}</td>
                        <td className="text-primary text-decoration-none">{post.title}</td>
                        <td className="text-center">{post.category.trim()}</td>
                        <td className="text-center">{post.updatedAt}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BlogTable;
