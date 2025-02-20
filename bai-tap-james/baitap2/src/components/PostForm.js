import React, { useState } from "react";

const PostForm = ({ initialData, onSubmit }) => {
    const [formData, setFormData] = useState(
        initialData || { title: "", category: "", content: "", slug: "", updatedAt: "" }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            slug: name === "title" ? value.toLowerCase().replace(/\s+/g, "-") : formData.slug,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.category || !formData.content) {
            alert("All fields are required!");
            return;
        }
        onSubmit({ ...formData, updatedAt: new Date().toLocaleString() });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label>Title</label>
                <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label>Category</label>
                <input type="text" name="category" className="form-control" value={formData.category} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label>Content</label>
                <textarea name="content" className="form-control" value={formData.content} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-success">Submit</button>
        </form>
    );
};

export default PostForm;
