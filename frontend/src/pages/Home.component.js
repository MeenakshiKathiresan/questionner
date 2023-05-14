import React, { Component } from "react";
import PostList from "../components/postlist.component";
import AddPost from "../components/addpost.component";
import { getAllPosts, getTagPosts } from "../api-services/postService";
import CardCarousel from "../components/cardcarousel.component";
import "../App.css";
import "../global.css";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { posts: [], searchWord: "" };
    this.state.searchWord = this.props.searchWord;
    this.state.tag = "";
  }

  componentDidMount() {
    const link = window.location.href;
    const tag = link.slice(link.lastIndexOf("/") + 1);
    this.setState({tag:tag})

    if (tag) {
      getTagPosts((data) => {
        this.setState({ posts: data });
      }, tag);
    } else {
      getAllPosts((data) => {
        this.setState({ posts: data });
      }, this.state.searchWord);
    }
  }

  render() {
    return (
      <div className="parent-div">
        <br />

        {this.state.tag ==""&& this.state.searchWord == ""? (
          <div>
          <h4>Latest</h4>
          <div className=" Carousel">
            <div className="Carousel-Content">
              <CardCarousel posts={this.state.posts} />
            </div>
          </div>
          </div>
        ) : (
          ""
        )}

        <br />
        <h4>All questions</h4>
        <PostList posts={this.state.posts} />
        <AddPost />
      </div>
    );
  }
}
