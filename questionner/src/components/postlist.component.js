import React, { Component } from "react";
import axios from "axios";
import Post from "./Post.component";

export default class PostList extends Component{
    
    constructor(props){
        super(props);

        this.state = {posts: []};
    }

    componentDidMount(){
        axios.get('http://localhost:5000/post')
        .then(response =>{
            this.setState({posts : response.data })
        })
        .catch((error) => {console.log(error)})
    }
    postList(){
        return this.state.posts.map(post => {
            return <Post post = {post} key = {post._id}></Post>
        })
    }
    render(){
        return (<div>
            {this.postList()}
        </div>)
    }
}