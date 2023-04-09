import React, { Component } from "react";
import { getUserPosts } from "../api-services/postService";
import { getUser } from "../api-services/profileService";
import PostList from "../components/postlist.component";
import "../global.css";
export default class profile extends Component {
  constructor(props) {
    super(props);

    this.state = { posts: [], user: {} };
  }

  componentDidMount() {
    getUser((userData) => {
      this.setState({ user: userData });
    })
    .then(()=>{
        getUserPosts(this.state.user._id, (data) => {
            this.setState({ posts: data });
          });
    })
    


  }

  render() {
    return (
      <div className="parent-div">
        <PostList posts={this.state.posts} />
      </div>
    );
  }
}
