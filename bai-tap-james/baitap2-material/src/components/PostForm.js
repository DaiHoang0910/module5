import React from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {TextField, Button, Box, Typography} from "@mui/material";

const PostForm = ({initialData, onSubmit}) => {
    const formik = useFormik({
        initialValues: initialData || {title: "", category: "", content: "", slug: "", updatedAt: ""},
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            category: Yup.string().required("Category is required"),
            content: Yup.string().required("Content is required"),
        }),
        onSubmit: (values) => {
            const slug = values.slug || values.title.toLowerCase().replace(/\s+/g, "-");
            onSubmit({...values, slug, updatedAt: new Date().toLocaleString()});
        },
    });

    return (
        <Box component="form" onSubmit={formik.handleSubmit} sx={{maxWidth: 600, mx: "auto", p: 2}}>
            <Typography variant="h5" sx={{mb: 2}}>
                {initialData ? "Edit Post" : "Add New Post"}
            </Typography>
            <TextField
                fullWidth
                label="Title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                sx={{mb: 2}}
            />
            <TextField
                fullWidth
                label="Category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.category && Boolean(formik.errors.category)}
                helperText={formik.touched.category && formik.errors.category}
                sx={{mb: 2}}
            />
            <TextField
                fullWidth
                label="Content"
                name="content"
                multiline
                rows={4}
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.content && Boolean(formik.errors.content)}
                helperText={formik.touched.content && formik.errors.content}
                sx={{mb: 2}}
            />
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </Box>
    );
};

export default PostForm;
