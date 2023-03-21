import React, { Component } from "react";

export default class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.OnUsernameEntry = this.OnUsernameEntry.bind(this);
    this.OnContentEntry = this.OnContentEntry.bind(this);
    this.OnHeadingEntry = this.OnHeadingEntry.bind(this);
    this.OnSubmit = this.OnSubmit.bind(this);
    this.OnTagsEntry = this.OnTagsEntry.bind(this);

    this.state = {
      username: "",
      heading: "",
      content: "",
      tags: [],
      users: [],
    };
  }

  componentDidMount() {
    console.log("mounted");
    this.setState({
      users: ["us1"],
      username: "us1",
    });
  }

  OnUsernameEntry(e) {
    this.setState({
      username: e.target.value,
    });
  }

  OnHeadingEntry(e) {
    this.setState({
      heading: e.target.value,
    });
  }

  OnContentEntry(e) {
    this.setState({
      content: e.target.value,
    });
  }

  OnTagsEntry(e) {
    this.setState({
      tags: e.target.value.split(","),
    });
  }

  OnSubmit(e) {
    // prevent default behavior of a submit button
    e.preventDefault();

    const post = {
      username: this.state.username,
      heading: this.state.heading,
      content: this.state.content,
      tags: this.state.tags,
    };

    console.log(post);
    window.location = "/";
  }

  render() {
    return (
      <div className="d-flex justify-content-center">
        <div className="w-50">
          <br />
          <br />
          <div>
            <h5>Create new post</h5>
          </div>
          <br />

          <form onSubmit={this.OnSubmit}>
            <div className="form-group">
              <label> Heading: </label>
              <input
                required
                className="form-control"
                value={this.state.heading}
                onChange={this.OnHeadingEntry}
              />
            </div>
            <br />

            <div className="form-group">
              <label> content: </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="6"
              ></textarea>
            </div>
            <br />

            <div className="form-group">
              <label> Tags: (comma separated) </label>
              <input
                className="form-control"
                selected={this.state.tags}
                onChange={this.OnTagsEntry}
              />
            </div>
            <br />
            <div className="form-group">
              <input type="submit" value="submit" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
