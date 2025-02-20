import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/orders')
            .then(response => setOrders(response.data))
            .catch(error => console.error('Error fetching orders:', error));
    }, []);

    return (
        <div>
            <h2>Danh sách đơn hàng</h2>
            <Link to="/add-order">Thêm đơn hàng mới</Link>
            <table>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã đơn hàng</th>
                    <th>Sản phẩm</th>
                    <th>Ngày mua</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tổng tiền</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order, index) => (
                    <tr key={order.orderId}>
                        <td>{index + 1}</td>
                        <td>{order.orderId}</td>
                        <td>{order.products.map(product => product.productName).join(', ')}</td>
                        <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                        <td>{order.products.map(product => product.price).join(', ')}</td>
                        <td>{order.products.map(product => product.quantity).join(', ')}</td>
                        <td>
                            {order.products.reduce((total, product) => total + product.price * product.quantity, 0)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;
