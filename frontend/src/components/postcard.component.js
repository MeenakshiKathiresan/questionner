import React, { Component } from "react";
import { getDaysSinceCreatedAt, getRandomPastelColor } from "../Utils/utils";
import { getUser } from "../api-services/profileService";
import { deletePost } from "../api-services/postService";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import Tags from "./tags.component";

import "../App.css";

export default class PostCard extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    const randomColor = getRandomPastelColor();
    this.state = {
      post: props.post,
      user: {},
      onUpdate: props.onUpdate,
      color: randomColor,
    };
  }

  render() {
    getUser((user) => (this.state.user = user));

    return (
      <div
        className="Default-Margin Post-Card"
        style={{ backgroundColor: this.state.color }}
      >
        <div className="p-2">
          <span className="btn btn-outline-secondary right-corner p-1 m-0">
            <BiCommentDetail size={12} />
            <span className="small p-1">{this.state.post.commentCount}</span>
          </span>

          <h5 className="p-3">{this.state.post.heading}</h5>

          <Tags tags={this.state.post.tags} />
        </div>

        <br />
        <div className="d-flex flex-row Post-Card-Author p-2">
          {this.state.post.user ? (
            <img
              className="rounded-circle shadow-1-strong me-3 mt-1"
              src={this.state.post.user.dp}
              alt=""
              width="28"
              height="28"
            />
          ) : (
            ""
          )}

          <div className="small">
            <b>{this.state.post.user.username} </b>
            <br />
            {getDaysSinceCreatedAt(this.state.post.createdAt)}
          </div>
        </div>
      </div>
    );
  }
}
