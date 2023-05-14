import React, { Component } from "react";
import { convertDate, generateCreatedAtText } from "../Utils/utils";
import { upVoteComment, downVoteComment } from "../api-services/postService";
import {
  AiFillEdit,
  AiFillDelete,
  AiFillCaretDown,
  AiFillCaretUp,
} from "react-icons/ai";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.deleteCommentPost = this.deleteCommentPost.bind(this);
    this.upVoteCommentPost = this.upVoteCommentPost.bind(this);
    this.getCurrentVote = this.getCurrentVote.bind(this);
    this.state = { comments: props.comments };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.comments !== this.props.comments) {
      this.setState({
        comments: this.props.comments,
      });
    }
  }

  editComment() {}

  upVoteCommentPost(comment, user) {
    this.setState({
      comments: this.state.comments.map((com) => {
        if (comment._id === com._id) {
          if (!com.upvotes.includes(user._id)) {
            com.upvotes.push(user._id);
          }
          if (com.downvotes.includes(user._id)) {
            com.downvotes = com.downvotes.filter((vote) => vote !== user._id);
          }
        }
        return com; // Return the modified comment object
      }),
    });
    
    upVoteComment(comment, user);
  }

  downVoteCommentPost(comment, user) {

    this.setState({
      comments: this.state.comments.map((com) => {
        if (comment._id === com._id) {
          if (!com.downvotes.includes(user._id)) {
            com.downvotes.push(user._id);
          }
          if (com.upvotes.includes(user._id)) {
            com.upvotes = com.upvotes.filter((vote) => vote !== user._id);
          }
        }
        return com; // Return the modified comment object
      }),
    });

    downVoteComment(comment, user);
  }

  getCurrentVote(comment) {
    if (comment.upvotes && comment.downvotes) {
      return comment.upvotes.length - comment.downvotes.length;
    }
  }

  deleteCommentPost(comment) {
    this.props.onDeleteComment(comment);
  }

  render() {
    return (
      <div className="Default-Margin">
        {this.state.comments.map((comment) => (
          <div>
            <div className="d-flex flex-start mb-4">
              <div>
                <br />
                <div
                  className="btn"
                  onClick={(e) =>
                    this.upVoteCommentPost(comment, this.props.user)
                  }
                >
                  <AiFillCaretUp size={30} color="grey" />
                </div>
                <br />
                &nbsp; &nbsp; {this.getCurrentVote(comment)}
                <div
                  className="btn"
                  onClick={(e) =>
                    this.downVoteCommentPost(comment, this.props.user)
                  }
                >
                  <AiFillCaretDown size={30} color="grey" />
                </div>
              </div>
              {comment.user ? (
                <div className="card w-100">
                  <div className="card-body p-3">
                    <div className="d-flex">
                      <img
                        className="rounded-circle shadow-1-strong me-3"
                        src={comment.user ? comment.user.dp : "as"}
                        alt="avatar"
                        width="35"
                        height="35"
                      />
                      <div>
                        <b>{comment.user.username}</b>
                        <p className="small">
                          {comment.createdAt
                            ? convertDate(comment.createdAt)
                            : generateCreatedAtText()}
                        </p>
                      </div>
                    </div>

                    <div className="right-corner">
                      {comment.user._id == this.props.user._id && (
                        <div className="d-flex ">
                          <div className="btn">
                            <AiFillEdit color="orange" />
                          </div>
                          <div
                            className="btn"
                            onClick={(e) => this.deleteCommentPost(comment)}
                          >
                            <AiFillDelete color="red" />
                          </div>
                        </div>
                      )}
                    </div>

                    <p>
                      <ReactMarkdown>{comment.text}</ReactMarkdown>
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}

        <br />
      </div>
    );
  }
}
