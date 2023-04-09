import React, { Component } from "react";
import PostList from "../components/postlist.component";
import {getAllPosts} from "../api-services/postService"
import "../global.css"
export default class Home extends Component{

    constructor(props) {
        super(props);
    
        this.state = { posts: [] };
      }

    componentDidMount() {
        getAllPosts((data)=>this.setState({posts: data}))
    }

    render(){
        return (
        <div className="parent-div">
           
            <PostList posts = {this.state.posts}/>


        </div>
            )
    }
}