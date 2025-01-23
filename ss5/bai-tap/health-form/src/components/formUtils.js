import { toast } from 'react-toastify';

export const validateForm = (values) => {
    const errors = {};

    if (!values.name) errors.name = 'Required';
    if (!values.passport) errors.passport = 'Required';
    if (!values.birthYear || values.birthYear <= 1900) errors.birthYear = 'Year must be greater than 1900';
    if (!values.nationality) errors.nationality = 'Required';
    if (!values.city) errors.city = 'Required';
    if (!values.district) errors.district = 'Required';
    if (!values.ward) errors.ward = 'Required';
    if (!values.street) errors.street = 'Required';
    if (!values.phone) errors.phone = 'Required';
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};
export const handleSubmitForm = (values) => {
    toast.success('Khai báo thành công!');
    console.log('Form values:', values);
};
