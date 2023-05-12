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
    this.search = this.search.bind(this)
  }

  handleSearchInputChange = (event) => {
    const value = event.target.value;
    this.setState({ searchInputValue: value });
    console.log(value, "updated");
    this.props.setSearchWord(value);
  };

  search = (event) => {
    const value = event.target.value;
    this.setState({ searchInputValue: value });
    console.log(value, "search");
    this.props.setSearchWord(value);
  };

  render() {
    return (
      <nav className="navbar-dark navbar-expand-md bg-dark sticky-top">
        <div className="parent-div d-flex justify-content-between p-1">
          <div className="mt-2">
            <Link className="navbar-brand" to="/">
              <h5>Questionner</h5>
            </Link>
          </div>
       
          <form className="form-inline">
            <div className="input-group custom-search-bar">
              <input
                type="text"
                className="form-control "
                placeholder="Search"
                aria-label="Search"
                onChange={this.handleSearchInputChange}
              />
              <button className="btn btn-outline-success" type="submit" onClick={this.search}>
                Search
              </button>
            </div>
          </form>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* <div className="nav-item text-light mt-2">
              <Link className="nav-link" to="/create">
                Create
              </Link>
            </div> */}
            <div className="float-right mt-1">
              <Login />
            </div>
          </div>
      </nav>
    );
  }
}
