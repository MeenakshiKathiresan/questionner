import React, { Component } from "react";
import { convertDate } from "../Utils/utils";


export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = { comments: props.comments };
  }

  componentDidMount() {
  console.log("comemtns")
  }

 
  render() {
    return (
      <div className="Default-Margin">
        {this.state.comments.map((comment) => (
              <div>
                <div className="d-flex flex-start mb-4">
                  <img
                    className="rounded-circle shadow-1-strong me-3"
                    src= {comment.user? comment.user.dp : "as"}
                    alt="avatar"
                    width="35"
                    height="35"
                  />
                  <div className="card w-100">
                    <div className="card-body p-3">
                      <div className="">
                        <b>{comment.user.username}</b>
                        <p className="small">{convertDate(comment.createdAt)}</p>
                        <p>
                          {comment.text}
                        </p>

                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                      
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

        <br />
      </div>
    );
  }
}
