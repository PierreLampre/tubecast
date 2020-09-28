import React, { Component } from "react";
import "./style.css";
import mail from "./img/mail.svg";
import tvg from "./img/tvg-logo.png";
import gif from "./img/hireme.gif"
import Clock from "../Clock/Clock";
import TimeBar from "../TimeBar/TimeBar"
import ChannelsBox from "../ChannelsBox/ChannelsBox"


export default class OnDemand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programs: props
    }
  }

  render() {
    
    return (
      <div className="od-container">
        <section className="header">
          <section className="logo">Tubecast</section>
          <section className="clock-and-icons">
            <section className="tv-listings">TV Listings</section>
            <img src={mail} className="mail-icon" alt="The back of an envelope."/>
            <Clock />  
            <span className="tvg-box">
              <img src={tvg} className="tvg" alt="The TV Guide logo." />
            </span>
          </section>
        </section>
        <section className="info">
          <section className="program-station">
            <section className="program-station-content">
              <span className="channel-name">{this.props.name}</span>
              <span className="channel-id">{this.props.text}</span>
            </section>
          </section>
          <section className="program-blurb">
            <span className="program-fixed-width-box">
              {/* 94 Characters */}
              {this.props.blurb}
            </span>
          </section>
        </section>
        <section className="commercial">
          <div className="yt-box">
            <iframe
              title="A YouTube Iframe"
              className="yt"
              src="https://www.youtube.com/embed/zGj0sGAsjUU?t=302&mute=1&controls=1&autoplay=1&loop=1&playlist=zGj0sGAsjUU"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
            ></iframe>
          </div>
        </section>
        <TimeBar />
        <ChannelsBox {...this.state.programs} />
        <section className="footer">
          <a href="https://github.com/pierrelampre" target="_blank" rel="noopener noreferrer"><img src={gif} alt="An animated gif begging someone to hire me." /></a>
        </section>
      </div>
    );
  }
}
