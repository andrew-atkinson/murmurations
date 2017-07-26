import React, { Component } from "react";

export default class simpleProject extends Component {
  componentDidMount() {
    const scripts = [
      "/js/sketch1.js",
      "/js/bird.js"
    ];

    scripts.map(script => {
      const scriptEl = document.createElement("script");
      scriptEl.src = script;
      scriptEl.async = true;
      document.body.appendChild(scriptEl);
    });
  }

  render() {
    return <div />;
  }
}
