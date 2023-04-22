import React, { Component } from "react";
import { convertDate } from "../Utils/utils";
import { getUser } from "../api-services/profileService";
import { deletePost } from "../api-services/postService";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Tags from "./tags.component";

import "../App.css";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { post: props.post, user: {}, onUpdate: props.onUpdate };
  }

  render() {
    getUser((user) => (this.state.user = user));

    return (
      <div className="Default-Margin Post-Box p-3">
        <span className="btn btn-outline-secondary right-corner p-2">
          <BiCommentDetail /> {this.state.post.commentCount}
        </span>

        <div className="float-end">
          {this.state.user != null &&
            this.state.user._id == this.state.post.user._id && (
              <div>
                <div className="d-flex align-items-center">
                  <div className="btn  p-1">
                    <AiFillEdit color="orange" />
                  </div>
                  <div
                    className="btn p-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      deletePost(this.state.post); //.then(this.state.onUpdate(this.state.post));
                    }}
                  >
                    <AiFillDelete color="red" />

                    
                  </div>
                </div>
              </div>
            )}
        </div>

        <div>
          <h5>{this.state.post.heading}</h5>
        </div>
        <div className="d-flex flex-row">
        {this.state.post.user ?
          <img
            className="rounded-circle shadow-1-strong me-3 mt-1"
            src={this.state.post.user.dp}
            alt=""
            width="35"
            height="35"
          />: ""}

          <div>
            {this.state.post.user.username}
            <br />
            <div className="small">
              {convertDate(this.state.post.createdAt)}
            </div>
          </div>
        </div>

        <br />
        <ReactMarkdown>
        {this.state.post.content}
        </ReactMarkdown>
   
  
          <Tags tags={this.state.post.tags}/>

 
        <br/>
      </div>
    );
  }
}
