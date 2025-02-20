import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    product: Yup.string().required('Sản phẩm là bắt buộc'),
    quantity: Yup.number().required('Số lượng là bắt buộc').positive('Số lượng phải lớn hơn 0').integer('Số lượng phải là số nguyên'),
    orderDate: Yup.date().required('Ngày mua là bắt buộc').max(new Date(), 'Ngày mua không thể lớn hơn ngày hiện tại')
});

const OrderForm = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleSubmit = (values, { resetForm }) => {
        const newOrder = {
            orderId: `ORD-${Date.now()}`,
            orderDate: values.orderDate,
            products: [
                {
                    productName: values.product,
                    price: products.find(p => p.name === values.product)?.price,
                    quantity: values.quantity
                }
            ]
        };
        axios.post('http://localhost:5000/orders', newOrder)
            .then(() => {
                toast.success('Đơn hàng đã được thêm thành công!');
                resetForm();
                navigate('/orders');
            })
            .catch(error => {
                toast.error('Đã có lỗi xảy ra!');
                console.error(error);
            });
    };

    return (
        <div>
            <h2>Thêm mới đơn hàng</h2>
            <Formik
                initialValues={{ product: '', quantity: '', orderDate: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div>
                        <label>Sản phẩm</label>
                        <Field as="select" name="product">
                            <option value="">Chọn sản phẩm</option>
                            {products.map(product => (
                                <option key={product.id} value={product.name}>
                                    {product.name}
                                </option>
                            ))}
                        </Field>
                    </div>
                    <div>
                        <label>Số lượng</label>
                        <Field type="number" name="quantity" />
                    </div>
                    <div>
                        <label>Ngày mua</label>
                        <Field type="date" name="orderDate" />
                    </div>
                    <div>
                        <button type="submit">Thêm đơn hàng</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default OrderForm;
