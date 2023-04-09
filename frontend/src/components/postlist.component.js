import React, { Component } from "react";
import Post from "./post.component";
import {Link} from 'react-router-dom';
import { getAllPosts } from "../api-services/postService";

export default class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = { posts: [] };
    this.onUpdate = this.onUpdate.bind(this)
  }

  componentDidMount() {
      getAllPosts((data)=>this.setState({posts: data}))
  }

  onUpdate(post){
    console.log("updates")
    this.setState({posts: this.state.posts.filter(currentPost => post._id!=currentPost._id)})
    
  }
  
  postList() {
    return this.state.posts.map(post => {
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
