import React, { Component } from "react";

export default class Post extends Component{
    constructor(props){
        super(props);
        this.state = {post : props.post}
    }

    render(){
        return (<div>
            <br/>
            <h3>{this.state.post.heading}</h3>
            
            {this.state.post.content}<br/>
            
            {this.state.post.tags}
        </div>)
    }
}