import React, { Component } from "react";
import { useState } from "react";
import autosize from "autosize";
import "./textform.css";



export default class Textform extends Component {

  state = {};
  componentDidMount() {
    this.textarea.focus();
    autosize(this.textarea);
  }

  render() {

    return (
      <div className="titleDiv">
        <h3>Title:</h3>
        <textarea
          className="titleForm"
          ref={(c) => (this.textarea = c)}
          placeholder="Type title here..."
          rows={1}
          defaultValue=""
          required
        />
      </div>
    );
  }
}
