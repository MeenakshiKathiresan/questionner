import React, { Component } from "react";
import PostList from "../components/postlist.component";
import "../global.css"
export default class EditPost extends Component{
    render(){
        return (
        <div className="parent-div">
           
            <PostList/>


        </div>
            )
    }
}