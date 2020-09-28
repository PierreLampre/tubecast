import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default class MusicChoice extends Component {

    render() {

    return (
      <div className="mc-container">
        <section className="message-box">
          <h1 className="message-header">DID YOU KNOW?</h1>
          <section className="message-blurb">
            Justin Lampe is available for work and ready to start solving problems for your organization.
          </section>
          <iframe src={`https://open.spotify.com/embed/playlist/`} width="300" height="75" frameBorder="0" allowtransparency="true" allow="encrypted-media" title="the video screen"></iframe>
        </section>
        <section className="big-picture"></section>
        <section className="playlist-name-row">
          <h2 className="they-hate-it">
            THEY HATE IT
          </h2>
        </section>
        <section className="logo2-box">
          <p className="logo2">od</p>
          <p className="logo-sub">On Demand</p>
        </section>
        <section className="track-info-box">
          <div className="box-of-ps">
            <p className="artist">Harry Nilsson</p>
            <p className="song">"Gotta Get Up"</p>
            <p className="album">Nilsson Schmilsson &#40; 1971&#41;</p>
            <Link
              to={`/?access_token=${this.props.token}`}
              className="back-home"
            >
              <span className="arrow" id="arrow">
                &larr;
              </span>
              Back To Menu
            </Link>
          </div>
        </section>
      </div>
    );
  }
}
