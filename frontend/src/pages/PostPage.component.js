import React, { Component } from "react";

import { getPost, getComments, addComment } from "../api-services/postService";

import Comments from "../components/comments.component";
import "../global.css"

export default class ViewPost extends Component {
  constructor(props) {
    super(props);
    this.state = { post: {}, comments: [], comment: "" };
    this.onComment = this.onComment.bind(this);
    this.onCommentEntry = this.onCommentEntry.bind(this);
  }

  componentDidMount() {
    const link = window.location.href;
    const postId = link.slice(link.lastIndexOf("/") + 1);

    getPost(postId, (data) => {
      this.setState({ post: data });
      console.log(this.state.post, "view post");
    });

    getComments(postId, (commentData) => {
      this.setState({ comments: commentData });
      console.log(this.state.comments, "in view!");
    });
  }

  onCommentEntry(e) {
    this.setState({
      comment: e.target.value,
    });
  }

  onComment = () => {
    const comment = {
    // user should be commenters not the post's user
      user: this.state.post.user,
      post: this.state.post._id,
      text: this.state.comment,
      upvotes: [],
      downvotes: [],
    };
    addComment(comment);
  };

  render() {
    return (
      <div className="parent-div">
        <br />
        <h3>{this.state.post.heading}</h3>
        {this.state.post.content}
        <br />

        {this.state.post.tags
          ? this.state.post.tags.map((tag) => (
              <span className="p-1">
                <span className="badge bg-secondary"> {tag} </span>{" "}
              </span>
            ))
          : "no tags"}

        <br />
        <br />
        {this.state.comments.length > 0 ?
        (<Comments comments = {this.state.comments} ></Comments>):""}

        <br />


        <div className="card-footer py-3 border-0">
          <div className="d-flex flex-start w-100">
            <img
              className="rounded-circle shadow-1-strong me-3"
              src={this.state.post.user ? this.state.post.user.dp : ""}
              alt="avatar"
              width="40"
              height="40"
            />

            <div className="form-outline w-100">
              {this.state.post.user ? this.state.post.user.username : ""}
              <textarea
                className="form-control"
                placeholder="Add an answer"
                onChange={this.onCommentEntry}
                rows="4"
              ></textarea>
            </div>
          </div>
          <div className="float-end mt-2 pt-1">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={this.onComment}
            >
              Post comment
            </button>
          </div>
        </div>
      </div>
    );
  }
}
