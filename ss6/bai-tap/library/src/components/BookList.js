import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBooks, deleteBook } from '../services/api';
import { toast } from 'react-toastify';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        const response = await getBooks();
        setBooks(response.data);
    };

    const handleDelete = async (id) => {
        try {
            await deleteBook(id);
            toast.success('Book deleted successfully!');
            loadBooks();
        } catch (error) {
            toast.error('Failed to delete the book!');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Library</h1>
            <button className="btn btn-primary mb-4" onClick={() => navigate('/add')}>
                Add a new Book
            </button>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {books.map((book) => (
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.quantity}</td>
                        <td>
                            <button className="btn btn-warning me-2" onClick={() => navigate(`/edit/${book.id}`)}>
                                Edit
                            </button>
                            <button className="btn btn-danger" onClick={() => handleDelete(book.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookList;
