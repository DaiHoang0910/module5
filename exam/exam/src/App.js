import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderList from './component/OrderList';
import OrderForm from './component/OrderForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

const App = () => {
    return (
        <Router>
            <div>
                <ToastContainer />
                <Routes>
                    <Route path="/orders" element={<OrderList />} />
                    <Route path="/add-order" element={<OrderForm />} />
                    <Route path="/" element={<OrderList />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
