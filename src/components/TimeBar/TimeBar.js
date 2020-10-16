import React, { Component } from "react";
import clockCal from "./img/clockCal.svg";
import play from "./img/play.svg";
import moment from "moment";

export default class TimeBar extends Component {
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

    let timeString = this.state.time;

    let hour = parseInt(timeString.substr(0, 1));
    let ampm = timeString.substr(4, 5);
    let theDecider = parseInt(timeString.substr(2,3));

    if (timeString.length > 6) {
        hour = parseInt(timeString.substr(0, 2));
        ampm = timeString.substr(5, 6);
        theDecider = parseInt(timeString.substr(3,4));
      }

    ampm = ampm.substr(0, ampm.length - 1);

    //Should you want to spoof the clock.abs

    // hour=11;
    // ampm="p";
    // theDecider="30";

    let ampm_2 = ampm;

    if((hour === 11) && (ampm === "a")) {
      ampm_2 = "p"
    } else if ((hour === 11) && (ampm === "p")) {
      ampm_2 = "a"
    }

    return (
      <section className="time-block">
        <div className="today">Today</div>
        <div className="divider">|</div>
        <div className="time">
          <img
            src={clockCal}
            className="clockCal"
            alt="A calendar with a clock."
          />
          <span>
            {hour}
            {/* Changes minute block of time display */}
            {(theDecider > 29) ? ":30" : ":00"}
            {ampm}
          </span>
        </div>
        <div className="divider">|</div>
        <div className="time">
          {/* Handles the hour being 12 and maintains time block scheme*/}
          {(hour === 12) ? ((theDecider > 29) ? (hour - 11) : hour) : ((theDecider > 29) ? hour + 1: hour)}
          {/* Changes minute block of time display */}
          {(theDecider > 29) ? ":00" : ":30"}
          {ampm_2}
        </div>
        <div className="divider">|</div>
        <div className="time">
          {/* Handles the hour being 12 */}
          {(hour === 12) ? (hour - 11) : hour + 1}
          {/* Changes minute block of time display */}
          {(theDecider > 29) ? ":30" : ":00"}
          {ampm_2}
        </div>
        <div className="divider">|</div>
        <img src={play} className="play" alt="A forward button that is purely for decoration." />
      </section>
    );
  }
}
