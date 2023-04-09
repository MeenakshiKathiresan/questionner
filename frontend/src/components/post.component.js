import React, { Component } from "react";
import { convertDate } from "../Utils/utils";
import { getUser } from "../api-services/profileService";
import { deletePost } from "../api-services/postService";
export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { post: props.post, user: {} , onUpdate: props.onUpdate};
  }

  render() {
    getUser((user) => (this.state.user = user));

    return (
      <div className="Default-Margin Post-Box p-3">
        <h5>{this.state.post.heading}</h5>
        <div className="d-flex flex-row">
          <img
            className="rounded-circle shadow-1-strong me-3 mt-1"
            src={this.state.post.user ? this.state.post.user.dp : ""}
            alt="avatar"
            width="35"
            height="35"
          />

          <div>
            {this.state.post.user.username}
            <br />
            <div className="small">
              {convertDate(this.state.post.createdAt)}
            </div>
          </div>
        </div>
        <br />
        {this.state.post.content}
        <br />
        <br />
        {this.state.post.tags
          ? this.state.post.tags.map((tag) => (
              <span className="p-1">
                <span className="badge bg-secondary"> {tag} </span>
              </span>
            ))
          : "no tags"}

        {this.state.user != null &&
          this.state.user._id == this.state.post.user._id && (
            <div>
              <div className="d-flex align-items-center">
                <div className="btn btn-secondary">Edit</div>
                <div
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    deletePost(this.state.post)//.then(this.state.onUpdate(this.state.post));
                    
                    ;
                  }}
                >
                  Delete
                </div>
              </div>
            </div>
          )}
        <br />
      </div>
    );
  }
}
