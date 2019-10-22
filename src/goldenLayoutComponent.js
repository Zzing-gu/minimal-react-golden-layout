import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import GoldenLayout from "golden-layout";

import "./goldenlayout-base.css";
import "./goldenlayout-dark-theme.css";

var config = {
  content: [
    {
      type: "row",
      content: [
        {
          title: "A react component",
          type: "react-component",
          component: "testItem"
        },
        {
          title: "Another react component",
          type: "react-component",
          component: "testItem"
        },
        {
          title: "Another react component",
          type: "react-component",
          component: "testItem"
        }
      ]
    }
  ]
};

class TestItem extends React.Component {
  render() {
    return <div>hihi</div>;
  }
}

function TestItem2(){
  return(
    <div>hello world!</div>
  )
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    var goldenLayoutInstance = new GoldenLayout(config, this.myRef.current);
    goldenLayoutInstance.registerComponent("testItem", TestItem);

    goldenLayoutInstance.init();
  }

  render() {
    return <div style={{ height: "100vh" }} ref={this.myRef}></div>;
  }
}
