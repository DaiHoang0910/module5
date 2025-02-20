import React, {useEffect, useState} from "react";
import postsData from "../data/posts.json";
import "bootstrap/dist/css/bootstrap.min.css";

const BlogTable = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts(postsData);
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">List Posts</h2>
            <table className="table table-bordered shadow">
                <thead className="bg-dark text-white text-center">
                <tr>
                    <th>ID</th>
                    <th className="text-start">Title</th>
                    <th>Category</th>
                    <th>Time</th>
                </tr>
                </thead>
                <tbody>
                {posts.map((post, index) => (
                    <tr key={post.slug}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-primary">{post.title}</td>
                        <td className="text-center">{post.category}</td>
                        <td className="text-center">{post.updatedAt}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BlogTable;
