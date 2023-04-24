import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../global.css";

import Login from "./login.component";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInputValue: "",
    };
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
  }

  handleSearchInputChange = (event) => {
    const value = event.target.value;
    this.setState({ searchInputValue: value });
    console.log(value, "updated");
    this.props.setSearchWord(value);
  };

  render() {
    return (
      <nav className="navbar-dark bg-dark sticky-top">
        <div className="parent-div d-flex justify-content-between">

          <div className="mt-2">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li>
                <Link className="navbar-brand" to="/">
                  <h5>Questionner</h5>
                </Link>
              </li>

              <li className="nav-item text-light">
              <Link className="nav-link" to="/create">
                Create
              </Link>
            </li>
        
            </ul>
          </div>
          <div className="mt-2">
            <form className="form-inline my-2 my-lg-0">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0 d-flex">
                <li className="mr-sm-2">
                  <input
                    type="text"
                    className="form-control mr-sm-2"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={this.handleSearchInputChange}
                  />
                </li>
                <li>
                  <button
                    className="btn btn-outline-success ml-2"
                    type="submit"
                  >
                    Search
                  </button>
                </li>
              </ul>
            </form>
          </div>

          <div className="float-right mt-2">
            <Login />
          </div>
        </div>
      </nav>
    );
  }
}
