import React, { Component } from "react";
import { getUserPosts } from "../api-services/postService";
import { getUser, getUserStats } from "../api-services/profileService";
import PostList from "../components/postlist.component";
import {
  AiFillQuestionCircle,
  AiFillDownCircle,
  AiFillUpCircle,
} from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import "../global.css";
import "../App.css";

export default class profile extends Component {
  constructor(props) {
    super(props);

    this.state = { posts: [], user: {}, stats: {} };
  }

  componentDidMount() {
    getUser((userData) => {
      this.setState({ user: userData });
    }).then(() => {
      getUserPosts(this.state.user._id, (data) => {
        this.setState({ posts: data });
      });
      getUserStats(this.state.user, (stats) =>{
        this.setState({stats: stats})
        console.log(stats)
      })
    });

 
  }

  render() {
    return (
      <div className="parent-div">
        <br />
        <div className="dashboard">
          <div className="metric posts">
            <p className="metric-number">{this.state.stats.postsCount}</p>
            <p className="metric-text"> <span> <AiFillQuestionCircle/> Posts</span></p>
          </div>
          <div className="metric answers">
            <div className="side"></div>
            <p className="metric-number">{this.state.stats.commentsCount}</p>
            <p className="metric-text"><span> <FaCommentAlt /> Answers</span></p>
          </div>
          <div className="metric upvotes">
            <p className="metric-number">{this.state.stats.upvotesCount}</p>
            <p className="metric-text"><span><AiFillUpCircle/> Upvotes</span></p>
          </div>
          <div className="metric downvotes">
            
            <p className="metric-number">{this.state.stats.downvotesCount}</p>
            <p className="metric-text"><span><AiFillDownCircle /> Downvotes</span></p>
          </div>
        </div>

        <PostList posts={this.state.posts} />
      </div>
    );
  }
}
