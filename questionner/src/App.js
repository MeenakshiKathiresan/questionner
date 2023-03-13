import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Component } from "react";

import Navbar from "./components/navbar.component";
import PostList from "./components/postlist.component";
import EditPost from "./components/editpost.component";
import ViewPost from "./components/viewpost.component";
import CreatePost from "./components/createpost.component";
import Login from "./components/login.component";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" Component={PostList} />
        <Route path="/create" Component={CreatePost} />
        <Route path="/edit/:id" Component={EditPost} />
        <Route path="/:id" Component={ViewPost} />
        <Route path="/login" Component={Login} />
      </Routes>
    </Router>
  );
}

export default App;
