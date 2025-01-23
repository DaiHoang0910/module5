import React from 'react';
import { Formik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactInfo from './components/ContactInfo';
import HealthScreening from './components/HealthScreening';
import { validateForm, handleSubmitForm } from './components/formUtils';

function App() {
  return (
      <div className="container mt-5">
        <h1 className="text-center mb-4">Khai Báo Thông Tin Y Tế</h1>
        <Formik
            initialValues={{ name: '', passport: '', birthYear: '', nationality: '', city: '', district: '', ward: '', street: '', phone: '', email: '' }}
            validate={validateForm}
            onSubmit={handleSubmitForm}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <ContactInfo
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                />
                <HealthScreening
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                />
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
          )}
        </Formik>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
  );
}

export default App;
