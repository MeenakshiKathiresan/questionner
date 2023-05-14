import React, { Component } from "react";

import { getPost, getComments, addComment, deleteComment} from "../api-services/postService";
import { convertDate } from "../Utils/utils";
import { getUser, login } from "../api-services/profileService";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Comments from "../components/comments.component";
import "../global.css";
import Tags from "../components/tags.component";

export default class ViewPost extends Component {
  constructor(props) {
    super(props);
    this.state = { post: {}, comments: [], comment: "", user: {} };
    this.onComment = this.onComment.bind(this);
    this.onCommentEntry = this.onCommentEntry.bind(this);
    this.deletePostComment = this.deletePostComment.bind(this);
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

    getUser((userData) => {
      if (userData == null) {
        login();
      } else {
        this.setState({ user: userData });
      }
    });
  }

  onCommentEntry(e) {
    this.setState({
      comment: e.target.value,
    });
    
  }

  onComment = () => {
    const comment = {
      user: this.state.user._id,
      post: this.state.post._id,
      text: this.state.comment,
      upvotes: [],
      downvotes: [],
    };
    addComment((comment) =>{
      this.setState({ comments: [...this.state.comments, comment]})
    }, comment);
    
    comment.user = this.state.user;
    comment.post = this.state.post;
  };

  deletePostComment(deletedComment) {
    deleteComment(deletedComment);
    const updatedComments = this.state.comments.filter(
      (comment) => comment._id !== deletedComment._id
    );
    console.log(deletedComment, updatedComments, "updated!")
    this.setState({
      comments: updatedComments,
    });
    
  }

  render() {
    return (
      <div className="parent-div">
        <br />
        <h3>{this.state.post.heading}</h3>
        <div className="d-flex flex-row">
          <img
            className="rounded-circle shadow-1-strong me-3 mt-1"
            src={this.state.post.user ? this.state.post.user.dp : ""}
            alt="avatar"
            width="35"
            height="35"
          />

          <div>
            {this.state.post.user ? this.state.post.user.username : ""}
            <br />
            <div className="small">
              {convertDate(this.state.post.createdAt)}
            </div>
          </div>
        </div>

        <br />

        <ReactMarkdown>{this.state.post.content}</ReactMarkdown>
        <br />
        
        <Tags tags={this.state.post.tags} />
        <br />
        <br />
        {this.state.comments.length > 0 ? (
          <Comments
            comments={this.state.comments}
            user={this.state.user}
            onDeleteComment={this.deletePostComment}
          ></Comments>
        ) : (
          ""
        )}

        <br />

        <div className="card-footer py-3 border-0">
          <div className="d-flex flex-start w-100">
            <img
              className="rounded-circle shadow-1-strong me-3"
              src={this.state.user ? this.state.user.dp : ""}
              alt="avatar"
              width="40"
              height="40"
            />

            <div className="form-outline w-100">
              {this.state.user ? this.state.user.username : ""}
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
