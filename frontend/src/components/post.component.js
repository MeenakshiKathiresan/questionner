import React, { Component } from "react";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { post: props.post };
  }

  render() {
    return (
      <div className="Default-Margin Post-Box p-3">
        <h4>{this.state.post.heading}</h4>
        created by
        <> {this.state.post.user.username} </>
        at {this.state.post.createdAt} <br />
        {this.state.post.content}
        <br />
        {this.state.post.tags
          ? this.state.post.tags.map((tag) => (
              <span className="p-1">
                <span className="badge bg-secondary"> {tag} </span>
              </span>
            ))
          : "no tags"}
        {console.log(this.state.post)}
        <br />
      </div>
    );
  }
}
