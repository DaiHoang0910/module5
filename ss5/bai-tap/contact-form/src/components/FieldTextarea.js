import React from 'react';

function FieldTextarea({ label, name, value, handleChange }) {
    return (
        <div>
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <textarea
                id={name}
                name={name}
                className="form-control"
                value={value}
                onChange={handleChange}
                rows="4"
            />
        </div>
    );
}

export default FieldTextarea;
