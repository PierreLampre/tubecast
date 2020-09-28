import React, { Component } from "react";
import "./style.css";
import OnDemand from "./components/OnDemand/OnDemand";
import { BrowserRouter as Router, Route } from "react-router-dom";
import channelStrings from "./channelStrings.json"
import ProgramView from "./components/ProgramView/ProgramView"


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programs: channelStrings,
      yt_id: "",
      channelText: channelStrings.blurbs.ion.channelText,
      channelBlurb: channelStrings.blurbs.ion.channelBlurb,
      programName: channelStrings.blurbs.ion.programName
    }
  }

  grabId=(id)=>{
    this.setState({yt_id: id});
    this.setState({channelText: channelStrings.blurbs.ion.channelText, 
                   channelBlurb: channelStrings.blurbs.ion.channelBlurb, 
                   programName: channelStrings.blurbs.ion.programName})
  }

  grabInfo=(text, blurb)=>{
    this.setState({channelText: text, channelBlurb: blurb});
  }

  getName=(name)=>{
    this.setState({programName: name});
  }

  render() {
    
    return (
      <div className="App">
        <Router>
          <Route path="/" exact>
            <OnDemand {...this.state.programs} 
            id={this.state.yt_id} 
            grabId={this.grabId.bind(this)}
            grabInfo={this.grabInfo.bind(this)}
            getName={this.getName.bind(this)}
            text={this.state.channelText}
            blurb={this.state.channelBlurb}
            name={this.state.programName}
            />  
          </Route>
          <Route path="/mc"> 
            <ProgramView {...this.state.programs} id={this.state.yt_id}/>
          </Route>
        </Router>
      </div>
    );
  }
}

export default App;