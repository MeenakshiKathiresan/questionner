import React, { Component } from "react";
import { convertDate } from "../Utils/utils";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { post: props.post };
  }

  render() {
    return (
      <div className="Default-Margin Post-Box p-3">
        
        <div className="d-flex flex-row">
          <img
            className="rounded-circle shadow-1-strong me-3 mt-1"
            src={this.state.post.user ? this.state.post.user.dp : ""}
            alt="avatar"
            width="35"
            height="35"
          />

          <div>
            {this.state.post.user.username}<br />
            <div className="small">
              {convertDate(this.state.post.createdAt)}
            </div>
          </div>
        </div>
        <br />
        <h5>{this.state.post.heading}</h5>
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
        <br />
      </div>
    );
  }
}
