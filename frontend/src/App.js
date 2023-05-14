import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Component, useState } from "react";

import Navbar from "./components/navbar.component";
import Home from "./pages/Home.component";
import EditPost from "./pages/editPost.component";
import ViewPost from "./pages/PostPage.component";
import CreatePost from "./pages/createpost.component";
import Login from "./components/login.component";
import Profile from "./pages/Profile.component"
import SearchContext from "./context/SearchContext";
import { Profiler } from "react";

function App() {
  
  const [searchWord, setSearchWord] = useState('');


  return (
    <Router>

      <SearchContext.Provider value={{searchWord, setSearchWord}}>
        <Navbar setSearchWord={setSearchWord}/>
      </SearchContext.Provider>
      <Routes>
        <Route path="/" Component={(props) => <Home {...props} searchWord={searchWord} />}/>
        <Route path="/tags/:tag" Component={(props) => <Home {...props} searchWord={searchWord} />}/>
        <Route path="/create" Component={CreatePost} />
        <Route path="/edit/:id" Component={EditPost} />
        <Route path="/detail/:id" Component={ViewPost} />
        <Route path='/profile' Component={Profile}/>
      </Routes>
    </Router>
  );
}

export default App;
