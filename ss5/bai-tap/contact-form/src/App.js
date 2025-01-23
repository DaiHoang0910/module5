import React from 'react';
import { Formik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css';
import FieldInput from './components/FieldInput';
import FieldTextarea from './components/FieldTextarea';

// Regex for email validation
const REGEX = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

function App() {
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Contact Form</h1>
            <Formik
                initialValues={{ name: '', email: '', phone: '', message: '' }}
                validate={(values) => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = 'Required';
                    }

                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (!REGEX.email.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }

                    if (!values.phone) {
                        errors.phone = 'Required';
                    }

                    return errors;
                }}
                onSubmit={(values, { resetForm }) => {
                    toast.success('Add contact successfully!!!');
                    console.log('Form submitted:', values);
                    resetForm();
                }}
            >
                {({ values, errors, touched, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <FieldInput label="Name" name="name" type="text"
                                    value={values.name} handleChange={handleChange}
                                    error={errors.name} touched={touched.name} />
                        <FieldInput
                            label="Email" name="email" type="email" value={values.email}
                            handleChange={handleChange} error={errors.email} touched={touched.email} />
                        <FieldInput
                            label="Phone" name="phone" type="text" value={values.phone}
                            handleChange={handleChange} error={errors.phone} touched={touched.phone} />
                        <FieldTextarea label="Message" name="message" value={values.message} handleChange={handleChange} />
                        <button type="submit">Submit</button>
                    </form>
                )}
            </Formik>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}

export default App;
