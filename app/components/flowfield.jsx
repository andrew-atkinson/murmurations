import React, { Component } from "react";

export default class flowField extends Component {
  componentDidMount() {
    const scripts = [
      "/js/sketch5.js",
      "/js/bird.js",
      "/js/flow1.js"
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
