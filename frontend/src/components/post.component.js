import React, { Component } from "react";

export default class Post extends Component{
    constructor(props){
        super(props);
        this.state = {post : props.post}
    }

    render(){
        return (<div className="Default-Margin Post-Box p-3">
         
            <h4>{this.state.post.heading}</h4>
            
            <>Margaret asked on 3/30/2023 </><br/> <br/>
            
            
            {this.state.post.content}<br/>
            
            {this.state.post.tags} <br/> 
            <br/>
        </div>)
    }
}