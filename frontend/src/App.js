import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Component } from "react";

import Navbar from "./components/navbar.component";
import Home from "./pages/Home.component";
import EditPost from "./components/editpost.component";
import ViewPost from "./pages/PostPage.component";
import CreatePost from "./pages/createpost.component";
import Login from "./components/login.component";
import Profile from "./pages/Profile.component"
import { Profiler } from "react";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/create" Component={CreatePost} />
        <Route path="/edit/:id" Component={EditPost} />
        <Route path="/detail/:id" Component={ViewPost} />
        <Route path='/profile' Component={Profile}/>
      </Routes>
    </Router>
  );
}

export default App;
