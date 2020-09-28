import React, { Component } from 'react'
import "./style.css"

export default class ProgramView extends Component {
    constructor(props) {
        super(props);
        this.state = {
          programs: props,
          id: this.props.id
        }
      }

    render() {

        let theRightLink = "https://www.youtube.com/embed/" + this.state.id + "?t=0s&controls=1&autoplay=1&loop=1&playlist=zGj0sGAsjUU"

        return (
        <section className="pv-container">

            <section className="yt-iframe-container">

                <iframe
                title="A YouTube Iframe"
                src={theRightLink}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
                allowFullScreen="allowfullscreen"
                mozallowfullscreen="mozallowfullscreen" 
                msallowfullscreen="msallowfullscreen" 
                oallowfullscreen="oallowfullscreen" 
                webkitallowfullscreen="webkitallowfullscreen"
                ></iframe>

            </section>

        </section>
            
        )
    }
}
