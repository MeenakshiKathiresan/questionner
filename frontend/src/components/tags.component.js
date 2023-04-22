import React, { Component } from "react";
import {Link} from 'react-router-dom';
export default class Tags extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
  

      return (
        <div>
        {
            this.props.tags? this.props.tags.map((tag) => (
                <span className="p-1">
                  <span className="badge bg-secondary"> <Link to ={`/tags/${tag}`} style={{ textDecoration: 'none', color:'white' }}>{tag} </Link></span>
                </span>
              ))
            : "no tags"}
      
      </div>)
  

    }
}