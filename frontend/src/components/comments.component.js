import React, { Component } from "react";
import { convertDate, generateCreatedAtText } from "../Utils/utils";
import { deleteComment } from "../api-services/postService";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.deleteCommentPost = this.deleteCommentPost.bind(this);
  }

  componentDidMount() {}

  editComment() {}

  deleteCommentPost(comment) {
    this.setState({
      comments: this.props.comments.filter(
        (currentComment) => comment._id != currentComment._id
      ),
    });
    deleteComment(comment);
  }

  render() {
    return (
      <div className="Default-Margin">
        {this.props.comments.map((comment) => (
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
                      <p className="small">
                        {comment.createdAt
                          ? convertDate(comment.createdAt)
                          : generateCreatedAtText()}
                      </p>
                      <p>
                        <ReactMarkdown>{comment.text}</ReactMarkdown>
                      </p>
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
