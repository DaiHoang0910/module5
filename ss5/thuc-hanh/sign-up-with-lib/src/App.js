import React from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import "./App.css";

export default function App() {
    const validationSchema = Yup.object({
        username: Yup.string()
            .matches(/^[a-zA-Z]{2,}$/, "Username must be at least 2 characters long and contain only letters.")
            .required("Username is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .matches(
                /^[a-zA-Z0-9!@#%^&*()+=._-]{6,}$/,
                "Password must be at least 6 characters long."
            )
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm password is required"),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert("Sign up successfully!!!");
            console.log(values);
        },
    });

    return (
        <div>
            <h1>Sign up</h1>
            <form onSubmit={formik.handleSubmit}>
                <div
                    className={`custom-input ${formik.errors.username && formik.touched.username ? "custom-input-error" : ""}`}>
                    <label>Username</label>
                    <input
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.username && formik.touched.username && (
                        <p className="error">{formik.errors.username}</p>
                    )}
                </div>

                <div
                    className={`custom-input ${formik.errors.email && formik.touched.email ? "custom-input-error" : ""}`}>
                    <label>Email</label>
                    <input
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && formik.touched.email && (
                        <p className="error">{formik.errors.email}</p>
                    )}
                </div>

                <div
                    className={`custom-input ${formik.errors.password && formik.touched.password ? "custom-input-error" : ""}`}>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.password && formik.touched.password && (
                        <p className="error">{formik.errors.password}</p>
                    )}
                </div>

                <div
                    className={`custom-input ${formik.errors.confirmPassword && formik.touched.confirmPassword ? "custom-input-error" : ""}`}>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                        <p className="error">{formik.errors.confirmPassword}</p>
                    )}
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
