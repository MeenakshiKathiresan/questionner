import React, { Component } from "react";
import { getUserPosts } from "../api-services/postService";
import {
  getUser,
  getUserStats,
  getUserWithId,
} from "../api-services/profileService";
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
    const link = window.location.href;
    const profileId = link.slice(link.lastIndexOf("/") + 1);

    getUserWithId(profileId, (data) => {
      this.setState({ user: data });
    });

    getUserPosts(profileId, (data) => {
      this.setState({ posts: data });
    });
    getUserStats(profileId, (stats) => {
      this.setState({ stats: stats });
      console.log(stats);
    });
  }

  render() {
    return (
      <div className="parent-div">
        <br />
        <div className="d-flex flex-row">
        <img
            className="rounded shadow-1-strong me-3 mt-1"
            src={this.state.user ? this.state.user.dp : ""}
            alt="avatar"
            width="100"
            height="100"
          />

        <div>
          <br/>
        <h4>{this.state.user.username}</h4>
        {this.state.user.email}
        </div>
        </div>
        <br/>

        <div className="dashboard">
          <div className="metric posts">
            <p className="metric-number">{this.state.stats.postsCount}</p>
            <p className="metric-text">
              <span>
                {" "}
                <AiFillQuestionCircle /> Posts
              </span>
            </p>
          </div>
          <div className="metric answers">
            <div className="side"></div>
            <p className="metric-number">{this.state.stats.commentsCount}</p>
            <p className="metric-text">
              <span>
                {" "}
                <FaCommentAlt /> Answers
              </span>
            </p>
          </div>
          <div className="metric upvotes">
            <p className="metric-number">{this.state.stats.upvotesCount}</p>
            <p className="metric-text">
              <span>
                <AiFillUpCircle /> Upvotes
              </span>
            </p>
          </div>
          <div className="metric downvotes">
            <p className="metric-number">{this.state.stats.downvotesCount}</p>
            <p className="metric-text">
              <span>
                <AiFillDownCircle /> Downvotes
              </span>
            </p>
          </div>
        </div>
        <br />
        <h4>Posts</h4>
        <PostList posts={this.state.posts} />
      </div>
    );
  }
}
