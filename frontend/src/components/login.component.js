import axios from "axios";
import React, { Component } from "react";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.getUser = this.getUser.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  handleOnClick() {
    console.log("open");
    window.open("http://localhost:5000/auth/google/callback", "_self");
  }

  logOut = async() => {
    try { 
      //await axios.get(  "http://localhost:5000/auth/logout")
      this.setState({ user: null });
    }
    catch (error) {
      console.log(error);
    }

  }

  getUser = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/auth/login/success",
        {
          withCredentials: true,
        }
      );
      this.setState({ user: data.user });
    } catch (errror) {
      console.log(errror);
    }
  };
  componentDidMount() {
    this.getUser();
  }

  render() {
    return (
      <div>
        {this.state.user ? (
          <div className="text-light">
            {this.state.user.username}
            <img src={this.state.user.dp} style={{ width: "30px" }} />
            <button onClick={this.logOut}>Logout</button>
          </div>
        ) : (
          <div>
            <button onClick={this.handleOnClick}>Sign in with google</button>
          </div>
        )}
      </div>
    );
  }
}
