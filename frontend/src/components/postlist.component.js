import React, { Component } from "react";
import Post from "./post.component";
import {Link} from 'react-router-dom';
import { getAllPosts, deletePost } from "../api-services/postService";

export default class PostList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = props;
    this.onUpdate = this.onDelete.bind(this)
    console.log(props.posts)
  }

  onDelete(post){
    console.log("updates")
    //this.setState({posts : this.props.posts.filter(currentPost => post._id!=currentPost._id)})
    deletePost(post); 
  }
  
  postList() {
    return this.props.posts.map(post => {
        return <Link to={ {pathname:`/detail/${post._id}`}} style={{ textDecoration: 'none', color:'black' }}>
         <Post post = {post} onDelete = {this.onDelete}></Post> <br /> 
          </Link>
    })
  }
  render() {
    return <div>
      
      {this.postList()}
      
      </div>;
  }
}
