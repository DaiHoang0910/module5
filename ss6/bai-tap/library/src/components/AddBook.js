import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBook } from '../services/api';
import { toast } from 'react-toastify';

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [quantity, setQuantity] = useState('');
    const navigate = useNavigate();

    const handleAdd = async () => {
        if (!title || !quantity) {
            toast.error('Please fill all fields!');
            return;
        }
        await addBook({ title, quantity: parseInt(quantity, 10) });
        toast.success('Book added successfully!');
        navigate('/');
    };

    return (
        <div className="container mt-5">
            <h1>Add a new Book</h1>
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
            <button className="btn btn-primary" onClick={handleAdd}>
                Add
            </button>
        </div>
    );
};

export default AddBook;
