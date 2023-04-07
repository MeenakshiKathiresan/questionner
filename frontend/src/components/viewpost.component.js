import React, { Component } from "react";
import axios from "axios";

import { getPost } from "../api-services/postService";

export default class ViewPost extends Component{

    constructor(props){
        super(props);
        this.state = {post : {}}
    }


    componentDidMount(){
        const link = window.location.href
        const postId = link.slice(link.lastIndexOf("/")+1)
        console.log(postId)

        getPost(postId, (data)=> {
            this.setState({post: data})
    
    })
    }

    render(){
        return (
        <div className="Default-Margin">
             <br/>
            <h3>{this.state.post.heading}</h3>
            
            {this.state.post.content}<br/>
            
            {this.state.post.tags} 

            <br/>
            username
            {this.state.post.username}
            <br/>
            {this.state.post.email}
            <br/>

            {console.log("post", this.state.post)}

            <>Margaret asked on 3/30/2023 </>
        </div>)
    }
}