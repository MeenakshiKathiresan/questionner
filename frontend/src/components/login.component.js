import axios from "axios";
import React, { Component } from "react";
import {getUser, login, logout} from "../api-services/profileService"
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
    })
    console.log("user getting");
  }

  render() {
    return (
      <div>
        {this.state.user ? (
          <div className="text-light">
            {this.state.user.username}
            <img src={this.state.user.dp} style={{ width: "30px" }} />
            <button onClick={logout}>Logout</button>
            
          </div>
        ) : (
          <div>
            <button onClick={login}>Sign in with google</button>
          </div>
        )}
      </div>
    );
  }
}
