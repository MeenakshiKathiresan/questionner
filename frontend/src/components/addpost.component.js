import React, { Component } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

export default class AddPost extends Component {
  render() {
    return(
    <Link className="nav-link add-button" to="/create">
      <AiFillPlusCircle size={40}/>
    </Link>)
  }
}
