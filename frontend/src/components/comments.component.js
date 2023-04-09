import React, { Component } from "react";
import { convertDate } from "../Utils/utils";
import { deleteComment } from "../api-services/postService";

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = { comments: props.comments, user: props.user };
    this.deleteCommentPost = this.deleteCommentPost.bind(this);
  }

  componentDidMount() {
    console.log("comemtns");
  }

  editComment() {}

  deleteCommentPost(comment) {
    console.log("delete clicked", comment, "comment deleting")
    deleteComment(comment);
  }

  render() {
    return (
      <div className="Default-Margin">
        {this.state.comments.map((comment) => (
          <div>
            <div className="d-flex flex-start mb-4">
              <img
                className="rounded-circle shadow-1-strong me-3"
                src={comment.user ? comment.user.dp : "as"}
                alt="avatar"
                width="35"
                height="35"
              />
              {comment.user ? (
                <div className="card w-100">
                  <div className="card-body p-3">
                    <div className="">
                      <b>{comment.user.username}</b>
                      <p className="small">{convertDate(comment.createdAt)}</p>
                      <p>{comment.text}</p>
                      {console.log(comment.user._id, this.state.user._id)}
                      {comment.user._id == this.state.user._id && (
                        <div className="d-flex align-items-center">
                          <div className="btn btn-secondary">Edit</div>
                          <div
                            className="btn btn-danger"
                            onClick={ (e) => this.deleteCommentPost(comment)}
                          >{console.log(comment, "comment check")}
                            Delete
                          </div>
                        </div>
                      )}

                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center"></div>
                      </div>
                    </div>
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
