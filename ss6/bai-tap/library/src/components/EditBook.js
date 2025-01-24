import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById, updateBook } from '../services/api';
import { toast } from 'react-toastify';

const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        const loadBookDetails = async () => {
            try {
                const response = await getBookById(id);
                setTitle(response.data.title);
                setQuantity(response.data.quantity);
            } catch (error) {
                toast.error('Failed to load book details');
            }
        };

        loadBookDetails();
    }, [id]);

    const handleSave = async () => {
        if (!title || !quantity) {
            toast.error('Please fill all fields!');
            return;
        }
        try {
            await updateBook(id, { title, quantity: parseInt(quantity, 10) });
            toast.success('Book updated successfully!');
            navigate('/');
        } catch (error) {
            toast.error('Failed to update the book');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Edit Book</h1>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Enter book title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="quantity" className="form-label">Quantity</label>
                <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    placeholder="Enter book quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </div>
            <button className="btn btn-success" onClick={handleSave}>
                Save
            </button>
        </div>
    );
};

export default EditBook;
