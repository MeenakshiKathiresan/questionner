import React, { Component } from "react";
import { getUser, login, logout } from "../api-services/profileService";
import { Link } from "react-router-dom";
import "../App.css"

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
    };
  }
  componentDidMount() {
    getUser((userData) => {
      this.setState({ user: userData });
    });
    console.log("user getting");
  }

  render() {
    return (
      <div className="left-space-for-children">
        {this.state.user ? (
          <div className="text-light">
            <Link to="/profile">{this.state.user.username}</Link>
            <img src={this.state.user.dp} style={{ width: "30px" }}/>
            <button className="btn btn-outline-secondary p-1" onClick={logout}>Logout</button>
          </div>
        ) : (
          <div>
            <button  className="btn btn-outline-secondary p-1" onClick={login}>Sign in with google</button>
          </div>
        )}
      </div>
    );
  }
}
