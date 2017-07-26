import React, { Component } from "react";

export default class flocking extends Component {
  componentDidMount() {
    const scripts = [
      "/js/sketch4.js",
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
