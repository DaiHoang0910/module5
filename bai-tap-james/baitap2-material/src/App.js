import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "@mui/material";

import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import ViewPost from "./pages/ViewPost";
import PostList from "./components/PostList";
import usePostHandler from "./service/usePostHandler";

const App = () => {
  const { posts, handleAddPost, handleEditPost, handleDeletePost } = usePostHandler();

  return (
      <Router>
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            <Route path="/" element={<PostList posts={posts} onDelete={handleDeletePost} />} />
            <Route path="/add" element={<AddPost onAdd={handleAddPost} />} />
            <Route path="/edit/:id" element={<EditPost posts={posts} onEdit={handleEditPost} />} />
            <Route path="/view/:id" element={<ViewPost posts={posts} />} />
          </Routes>
        </Container>
      </Router>
  );
};

export default App;
