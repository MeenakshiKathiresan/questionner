import React, { Component } from "react";
import axios from "axios";
import "../global.css"

import { login, getUser } from "../api-services/profileService";
import { getPost, editPost } from "../api-services/postService";
import Tags from "../components/tags.component";


export default class EditPost extends Component {
  constructor(props) {
    super(props);

    this.OnContentEntry = this.OnContentEntry.bind(this);
    this.OnHeadingEntry = this.OnHeadingEntry.bind(this);
    this.OnSubmit = this.OnSubmit.bind(this);
    this.OnTagsEntry = this.OnTagsEntry.bind(this);


    this.state = {
        _id:"",
      heading: "",
      content: "",
      tags: [],
      user:"",
    };
    const link = window.location.href;
    const _id = link.slice(link.lastIndexOf("/") + 1)
    
    getPost(_id, (post) => {
        this.setState({
            heading: post.heading, 
            content: post.content,
            tags: post.tags,
            _id: _id
        })
    })
  }

  componentDidMount() {
    
    getUser((userData) => {
      if (userData == null){
        login()
      }else{
        this.setState({user:userData._id});
      }
    });
  }

  OnHeadingEntry(e) {
    this.setState({
      heading: e.target.value,
    });
  }

  OnContentEntry(e) {
    this.setState({
      content: e.target.value,
    });
  }

  OnTagsEntry(e) {
    this.setState({
      tags: e.target.value.split(","),
    });
  }

  OnSubmit(e) {
    // prevent default behavior of a submit button
    e.preventDefault();
    

    const post = {
      _id: this.state._id,
      heading: this.state.heading,
      content: this.state.content,
      tags: this.state.tags,
      user: this.state.user
    };

    editPost(post);
    window.location.href = "/"
  }

  render() {
    return (
      <div className=" parent-div">
        <div>
          <br />
          <br />
          <div>
            <h5>Create new post</h5>
          </div>
          <br />

          <form onSubmit={this.OnSubmit}>
            <div className="form-group">
              <label> Heading: </label>
              <input
                required
                className="form-control"
                value={this.state.heading}
                onChange={this.OnHeadingEntry}
              />
            </div>
            <br />

            <div className="form-group">
              <label> content: </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="6"
                value={this.state.content}
                onChange={this.OnContentEntry}
              ></textarea>
            </div>
            <br />
            <Tags tags={this.state.tags} />
            <div className="form-group">
              <label> Tags: (comma separated) </label>
              <input
                className="form-control"
                value={this.state.tags}
                selected={this.state.tags}
                onChange={this.OnTagsEntry}
              />
            </div>
            <br />
            <div className="form-group">
              <input type="submit" value="submit" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
