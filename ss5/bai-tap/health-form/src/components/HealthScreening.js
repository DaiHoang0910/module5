import React from 'react';

const HealthScreening = ({values, errors, touched, handleChange}) => {
    return (
        <div>
            <div className="form-group">
                <label htmlFor="phone">Điện thoại</label>
                <input
                    id="phone"
                    name="phone"
                    type="text"
                    value={values.phone}
                    onChange={handleChange}
                    className={`form-control ${errors.phone && touched.phone ? 'is-invalid' : ''}`}
                />
                {errors.phone && touched.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                />
                {errors.email && touched.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
        </div>
    );
};

export default HealthScreening;
