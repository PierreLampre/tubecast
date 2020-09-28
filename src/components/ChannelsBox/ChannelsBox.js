import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export default class ChannelsBox extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      programs: props,
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

  handleClick = (e, id) => {
    this.props.grabId(id);
  };

  handleHover = (text, blurb) => {
    this.props.grabInfo(text, blurb);
  }

  handleName = (name) => {
    this.props.getName(name);
  }

  render() {
    let program = this.state.programs;

    let timeString = this.state.time;

    let hour = parseInt(timeString.substr(0, 1));
    let nextHour = hour + 1;

    let ampm = timeString.substr(4, 5);
    let theDecider = parseInt(timeString.substr(2, 3));

    // hour=1
    // nextHour=2
    // ampm="pm"
    // theDecider=30

    if (timeString.length > 6) {
      hour = parseInt(timeString.substr(0, 2));
      nextHour = hour === 12 ? hour - 11 : hour + 1;
      ampm = timeString.substr(5, 6);
      theDecider = parseInt(timeString.substr(3, 4));
    }

    let dramaSchedule = this.state.programs.channels.drama;

    let dramaFirstBlock = dramaSchedule.filter(
      (program) => program.timeSlot === hour + ampm
    );

    let dramaSecondBlock = dramaSchedule.filter(
      (program) => program.timeSlot === nextHour + ampm
    );

    let dramaBothBlocks = dramaFirstBlock.concat(dramaSecondBlock);

    let mst3kSchedule = this.state.programs.channels.mst3k;

    let mst3kFirstBlock = mst3kSchedule.filter(
      (program) => program.timeSlot === hour + ampm
    );

    let mst3kSecondBlock = mst3kSchedule.filter(
      (program) => program.timeSlot === nextHour + ampm
    );
    let mst3kBothBlocks = mst3kFirstBlock.concat(mst3kSecondBlock);

    let mysterySchedule = this.state.programs.channels.mystery;

    let mysteryFirstBlock = mysterySchedule.filter(
      (program) => program.timeSlot === hour + ampm
    );
    let mysterySecondBlock = mysterySchedule.filter(
      (program) => program.timeSlot === nextHour + ampm
    );
    let mysteryBothBlocks = mysteryFirstBlock.concat(mysterySecondBlock);

    let foodieSchedule = this.state.programs.channels.foodie;

    let foodieFirstBlock = foodieSchedule.filter(
      (program) =>
        program.timeSlot === hour + ampm ||
        program.timeSlot === hour + ":30" + ampm
    );
    let foodieSecondBlock = foodieSchedule.filter(
      (program) =>
        program.timeSlot === nextHour + ampm ||
        program.timeSlot === nextHour + ":30" + ampm
    );
    let foodieBothBlocks = foodieFirstBlock.concat(foodieSecondBlock);

    if (theDecider > 29 && foodieBothBlocks[0].length) {
      foodieBothBlocks.shift();
      foodieBothBlocks.push("spacer");
    } 

    if(!foodieBothBlocks[0].length && !foodieBothBlocks[1].length){ 
      foodieBothBlocks.push("spacer");
    }

    let foodBlock1;
    let foodBlock2;
    let foodBlock3;

  if(!foodieBothBlocks[0].length && foodieBothBlocks[1].length) {
    foodBlock1 = "program program-end-1";
    foodBlock2 = "program program-mid-half";
    foodBlock3 = "program program-start-half";
  } 

  if(!foodieBothBlocks[0].length && foodieBothBlocks[1].length && theDecider < 29) {
    foodBlock1 = "program program-end-1";
    foodBlock2 = "program program-start";
    foodBlock3 = "hidden";
  } else if(!foodieBothBlocks[0].length && foodieBothBlocks[1].length && theDecider > 29){
    foodBlock1 = "program program-end-2";
    foodBlock2 = "program program-mid-half";
    foodBlock3 = "program program-start-half";
  } else if(foodieBothBlocks[0].length && foodieBothBlocks[1].length){
    foodBlock1 = "program program-end-2";
    foodBlock2 = "program program-mid-half";
    foodBlock3 = "program program-start";
  } else if(!foodieBothBlocks[0].length && !foodieBothBlocks[1].length && theDecider > 29) {
    foodBlock1 = "program program-end-2";
    foodBlock2 = "program program-mid";
    foodBlock3 = "hidden";
  } else {
    foodBlock1 = "program program-end-1";
    foodBlock2 = "program program-start";
    foodBlock3 = "hidden";
  }

  if(foodieBothBlocks[0].length && !foodieBothBlocks[1].length && theDecider > 29) {
    foodBlock1 = "program program-end-2";
    foodBlock2 = "program program-mid";
    foodBlock3 = "hidden";
  }

  let ion = this.state.programs.blurbs.ion;

    return (
      <section className="channels-box">
        <div className="channel channel-1">
          <div>916</div>
          <div>YESDrama</div>
          <div className="genre genre1"></div>
        </div>
        <div className="genre genre-1"
        onMouseEnter={() => this.handleHover(program.blurbs.drama.channelText, program.blurbs.drama.channelBlurb)} 
        onMouseLeave={() => this.handleHover(ion.channelText, ion.channelBlurb)}>
          <Link
            to="/mc"
            className={
              theDecider > 29
                ? "program program-end-2"
                : "program program-end-1"
            }
            onClick={(e) => this.handleClick(e, dramaBothBlocks[0].id)}
            onMouseEnter={() => this.handleName(dramaBothBlocks[0].name)} 
            onMouseLeave={() => this.handleName(ion.programName)}
          >
            {dramaBothBlocks[0].name}
          </Link>
          <Link
            to="/mc"
            className={
              theDecider > 29 ? "program program-mid" : "program program-start"
            }
            onClick={(e) => this.handleClick(e, dramaBothBlocks[1].id)}
            onMouseEnter={() => this.handleName(dramaBothBlocks[1].name)} 
            onMouseLeave={() => this.handleName(ion.programName)}
          >
            {dramaBothBlocks[1].name}
          </Link>
        </div>
        <div className="channel channel-2">
          <div>917</div>
          <div>MST3K</div>
        </div>
        <div className="genre genre-2"
        onMouseEnter={() => this.handleHover(program.blurbs.mst3k.channelText, program.blurbs.mst3k.channelBlurb)} 
        onMouseLeave={() => this.handleHover(ion.channelText, ion.channelBlurb)}>
          <Link
            to="/mc"
            className={
              theDecider > 29
                ? "program program-end-2"
                : "program program-end-1"
            }
            onClick={(e) => this.handleClick(e, mst3kBothBlocks[0].id)}
            onMouseEnter={() => this.handleName(mst3kBothBlocks[0].name)} 
            onMouseLeave={() => this.handleName(ion.programName)}
          >
            {mst3kBothBlocks[0].name}
          </Link>
          <Link
            to="/mc"
            className={
              theDecider > 29 ? "program program-mid" : "program program-start"
            }
            onClick={(e) => this.handleClick(e, mst3kBothBlocks[1].id)}
            onMouseEnter={() => this.handleName(mst3kBothBlocks[1].name)} 
            onMouseLeave={() => this.handleName(ion.programName)}
          >
            {mst3kBothBlocks[1].name}
          </Link>
        </div>
        <div className="channel channel-3">
          <div>918</div>
          <div>Mystery!</div>
        </div>
        <div className="genre genre-3"
         onMouseEnter={() => this.handleHover(program.blurbs.mystery.channelText, program.blurbs.mystery.channelBlurb)} 
         onMouseLeave={() => this.handleHover(ion.channelText, ion.channelBlurb)}>
          <Link
            to="/mc"
            className={
              theDecider > 29
                ? "program program-end-2"
                : "program program-end-1"
            }
            onClick={(e) => this.handleClick(e, mysteryBothBlocks[0].id)}
            onMouseEnter={() => this.handleName(mysteryBothBlocks[0].name)} 
            onMouseLeave={() => this.handleName(ion.programName)}
          >
            {mysteryBothBlocks[0].name}
          </Link>
          <Link
            to="/mc"
            className={
              theDecider > 29 ? "program program-mid" : "program program-start"
            }
            onClick={(e) => this.handleClick(e, mysteryBothBlocks[1].id)}
            onMouseEnter={() => this.handleName(mysteryBothBlocks[1].name)} 
            onMouseLeave={() => this.handleName(ion.programName)}
          >
            {mysteryBothBlocks[1].name}
          </Link>
        </div>
        <div className="channel channel-4">
          <div>919</div>
          <div>Foodie</div>
        </div>
        <div className="genre genre-4"
        onMouseEnter={() => this.handleHover(program.blurbs.foodie.channelText, program.blurbs.foodie.channelBlurb)} 
        onMouseLeave={() => this.handleHover(ion.channelText, ion.channelBlurb)}>
          <Link
            to="/mc"
            className={foodBlock1}
            onClick={(e) => this.handleClick(e, foodieBothBlocks[0].id)}
            onMouseEnter={() => this.handleName(foodieBothBlocks[0].name)} 
            onMouseLeave={() => this.handleName(ion.programName)}
          >
            {foodieBothBlocks[0].name}
          </Link>
          <Link
            to="/mc"
            className={foodBlock2}
            onClick={(e) => this.handleClick(e, foodieBothBlocks[1].id)}
            onMouseEnter={() => this.handleName(foodieBothBlocks[1].name)} 
            onMouseLeave={() => this.handleName(ion.programName)}
          >
            {foodieBothBlocks[1].name}
          </Link>
          <Link
            to="/mc"
            className={foodBlock3}
            onClick={(e) => this.handleClick(e, foodieBothBlocks[2].id)}
            onMouseEnter={() => this.handleName(foodieBothBlocks[2].name)} 
            onMouseLeave={() => this.handleName(ion.programName)}
            >
            {foodieBothBlocks[2].name}
          </Link>
        </div>
      </section>
    );
  }
}
