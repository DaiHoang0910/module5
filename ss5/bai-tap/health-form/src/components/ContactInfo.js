import React from 'react';

const ContactInfo = ({values, errors, touched, handleChange}) => {
    return (
        <div>
            <div className="form-group">
                <label htmlFor="name">Họ tên</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                />
                {errors.name && touched.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="form-group">
                <label htmlFor="passport">CCCD / CMND</label>
                <input id="passport" name="passport" type="text" value={values.passport} onChange={handleChange}
                       className={`form-control ${errors.passport && touched.passport ? 'is-invalid' : ''}`}/>
                {errors.passport && touched.passport && <div className="invalid-feedback">{errors.passport}</div>}
            </div>

            <div className="form-group">
                <label htmlFor="birthYear">Năm sinh</label>
                <input id="birthYear" name="birthYear" type="number" value={values.birthYear} onChange={handleChange}
                       className={`form-control ${errors.birthYear && touched.birthYear ? 'is-invalid' : ''}`}/>
                {errors.birthYear && touched.birthYear && <div className="invalid-feedback">{errors.birthYear}</div>}
            </div>

            <div className="form-group">
                <label htmlFor="nationality">Quốc tịch</label>
                <input id="nationality" name="nationality" type="text" value={values.nationality}
                       onChange={handleChange}
                       className={`form-control ${errors.nationality && touched.nationality ? 'is-invalid' : ''}`}/>
                {errors.nationality && touched.nationality &&
                    <div className="invalid-feedback">{errors.nationality}</div>}
            </div>

            <div className="form-group">
                <label htmlFor="city">Tỉnh thành</label>
                <input id="city" name="city" type="text" value={values.city} onChange={handleChange}
                       className={`form-control ${errors.city && touched.city ? 'is-invalid' : ''}`}/>
                {errors.city && touched.city && <div className="invalid-feedback">{errors.city}</div>}
            </div>

            <div className="form-group">
                <label htmlFor="district">Quận / huyện</label>
                <input id="district" name="district" type="text" value={values.district} onChange={handleChange}
                       className={`form-control ${errors.district && touched.district ? 'is-invalid' : ''}`}/>
                {errors.district && touched.district && <div className="invalid-feedback">{errors.district}</div>}
            </div>

            <div className="form-group">
                <label htmlFor="ward">Phường / xã</label>
                <input id="ward" name="ward" type="text" value={values.ward} onChange={handleChange}
                       className={`form-control ${errors.ward && touched.ward ? 'is-invalid' : ''}`}/>
                {errors.ward && touched.ward && <div className="invalid-feedback">{errors.ward}</div>}
            </div>

            <div className="form-group">
                <label htmlFor="street">Số nhà, phố, tổ dân phố</label>
                <input id="street" name="street" type="text" value={values.street} onChange={handleChange}
                       className={`form-control ${errors.street && touched.street ? 'is-invalid' : ''}`}/>
                {errors.street && touched.street && <div className="invalid-feedback">{errors.street}</div>}
            </div>
        </div>
    );
};

export default ContactInfo;
