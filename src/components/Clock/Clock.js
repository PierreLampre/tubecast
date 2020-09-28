import React, { Component } from "react";
import moment from "moment";

export default class Clock extends Component {
  constructor() {
    super();
    this.state = {
      time: moment()
        .format("LT")
        .toString()
        .toLocaleLowerCase()
        .replace(/\s/g, ""),
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      time: moment()
        .format("LT")
        .toString()
        .toLocaleLowerCase()
        .replace(/\s/g, ""),
    });
  }

  render() {
    return (
      <span id="clock" className="clock">
        {this.state.time}
      </span>
    );
  }
}
