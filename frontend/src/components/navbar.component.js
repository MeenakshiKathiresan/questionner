import React, { Component } from "react";
import { Link } from "react-router-dom";

import Login from "./login.component";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <Link className="navbar-brand" to="/">
          Questionner
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Featured <span className="sr-only"></span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create">
                Create
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link disabled" href="/login">
                Login
              </Link>
            </li>
          </ul>

          <form className="form-inline my-2 my-lg-0">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li>
                <input
                  type="text"
                  className="form-control mr-sm-2"
                  placeholder="Search"
                  aria-label="Search"
                />
              </li>
              <li>
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </li>
            </ul>
          </form>
          <Login/>
        </div>
      </nav>
    );
  }
}
