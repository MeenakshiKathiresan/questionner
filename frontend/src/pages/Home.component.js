import React, { Component } from "react";
import PostList from "../components/postlist.component";
import { getAllPosts, getTagPosts } from "../api-services/postService";
import "../global.css";
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { posts: [] , searchWord:""};
    this.state.searchWord = this.props.searchWord
  }

  componentDidMount() {

    const link = window.location.href;
    const tag = link.slice(link.lastIndexOf("/") + 1);

    if (tag){
        console.log(this.props)
        console.log(tag)
        getTagPosts((data) => {
            this.setState({ posts: data });
          }, tag);
    }else{
        getAllPosts((data) => {
            this.setState({ posts: data });
          }, this.state.searchWord);
    }

  }

  render() {
    return (
      <div className="parent-div">
        <PostList posts={this.state.posts} />
      </div>
    );
  }
}
