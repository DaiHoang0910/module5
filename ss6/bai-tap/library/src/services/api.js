import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/books';

export const getBooks = () => axios.get(API_BASE_URL);
export const getBookById = (id) => axios.get(`${API_BASE_URL}/${id}`);
export const addBook = (book) => axios.post(API_BASE_URL, book);
export const updateBook = (id, book) => axios.put(`${API_BASE_URL}/${id}`, book);
export const deleteBook = (id) => axios.delete(`${API_BASE_URL}/${id}`);
