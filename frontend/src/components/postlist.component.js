import React, { Component } from "react";
import Post from "./post.component";
import {Link} from 'react-router-dom';
import { getAllPosts } from "../api-services/postService";

export default class PostList extends Component {
  constructor(props) {
    super(props);
    this.onUpdate = this.onUpdate.bind(this)
    console.log(props.posts)
  }

  

  onUpdate(post){
    console.log("updates")
    this.setState({posts: this.props.posts.filter(currentPost => post._id!=currentPost._id)})
    
  }
  
  postList() {
    console.log(this.props.posts)
    return this.props.posts.map(post => {
        return <Link to={ {pathname:`/detail/${post._id}`}} style={{ textDecoration: 'none', color:'black' }}>
          <Post post = {post} onUpdate = {this.onUpdate}></Post>
          </Link>
    })
  }
  render() {
    return <div>
      
      {this.postList()}
      
      </div>;
  }
}
