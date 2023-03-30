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
    this.findUser = this.findUser.bind(this);
  }

  handleOnClick() {
    console.log("open");
    window.open("http://localhost:5000/auth/google", "_self");

    // axios.get("http://localhost:5000/auth/google").then(
    //   response => {
    //     console.log(response)
    //   });
  }

  logOut = async () => {
    try {
      //await axios.get(  "http://localhost:5000/auth/logout")
      window.open("http://localhost:5000/auth/logout", "_self");
      this.setState({ user: null });
    } catch (error) {
      console.log(error);
    }
  };

  getUser = async () => {
    try {
      if (this.state.user != null) {
        await axios
          .get("http://localhost:5000/auth/login/success", {
            withCredentials: true,
          })
          .then((response) => {
            console.log(response.data, " response logged here");
            this.setState({ user: response.data.user });
          });
      }
    } catch (errror) {
      console.log(errror);
    }
  };

  componentDidMount() {
    this.getUser();
    console.log("user getting");
  }

  findUser = async () => {
    await axios
    .get("http://localhost:5000/auth/login/success", {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response.data, " response logged here");
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.findUser}>check</button>
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
