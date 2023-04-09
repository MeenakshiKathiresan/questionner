import React, { Component } from "react";
import Post from "./post.component";
import {Link} from 'react-router-dom';
import { getAllPosts } from "../api-services/postService";

export default class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = { posts: [] };
  }

  componentDidMount() {
      getAllPosts((data)=>this.setState({posts: data}))
  }
  
  postList() {
    return this.state.posts.map(post => {
        return <Link to={ {pathname:`/detail/${post._id}`}} style={{ textDecoration: 'none', color:'black' }}>
          <Post post = {post} key = {post._id}></Post>
          </Link>
    })
  }
  render() {
    return <div>
      
      {this.postList()}
      
      </div>;
  }
}
