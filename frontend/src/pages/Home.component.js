import React, { Component } from "react";
import PostList from "../components/postlist.component";
import "../global.css"
export default class Home extends Component{
    

    render(){
        return (
        <div className="parent-div">
           
            <PostList/>


        </div>
            )
    }
}