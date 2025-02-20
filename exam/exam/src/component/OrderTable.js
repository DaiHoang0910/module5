import React from 'react';

const OrderTable = ({ orders }) => {
    return (
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
                    <td>{order.quantity}</td>
                    <td>{order.totalAmount}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default OrderTable;
