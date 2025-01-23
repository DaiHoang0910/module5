import React from 'react';

function FieldInput({ label, name, type, value, handleChange, error, touched }) {
    return (
        <div>
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                className={`form-control ${error && touched ? 'is-invalid' : ''}`}
                value={value}
                onChange={handleChange}
            />
            {error && touched && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}

export default FieldInput;
