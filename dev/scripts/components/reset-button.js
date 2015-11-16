import React from "react";
import {BoardStore} from "../stores/BoardStore.js";
import {BoardActions} from "../actions/BoardActions.js";

let ResetButton = React.createClass({
  getInitialState: function(){
    return {
      loading: true,
    }
  },
  handleClick: function( action, data, event ) {
    let actions = [
      {name:"reset", fn:BoardActions.resetBoard},
      {name:"chooseDifficulty", fn:BoardActions.showDifficultyBoard},
      {name:"start", fn:BoardActions.startBoard.bind(this,200)},
      {name:"go-home", fn:BoardActions.goHome}
    ];
    actions.filter( actObj => actObj.name === action)[0].fn();
  },
  render: function(){
    let buttonToShow;
    if (this.props.storeData.boardToShow === "start") {
      buttonToShow = (
          <button className="reset-btn mdl-shadow--4dp" onClick={this.handleClick.bind(this,"chooseDifficulty")}>
            <svg id="forward-icon">
              <use xlinkHref={"#forward-icon"}></use>
            </svg>
          </button>
      )
    }
    else if (this.props.storeData.boardToShow === "difficulty"){
      buttonToShow = (
          <button className="reset-btn mdl-shadow--4dp" onClick={this.handleClick.bind(this,"reset")}>
            <svg id="forward-icon">
              <use xlinkHref={"#forward-icon"}></use>
            </svg>
          </button>
      )
    } else {
      buttonToShow = (
          <button className="reset-btn mdl-shadow--4dp" onClick={this.handleClick.bind(this,"reset")}>
            <svg id="replay-icon">
              <use xlinkHref={"#replay-icon"}></use>
            </svg>
          </button>
      )
    }

  return (
    <div id="nav-buttons">
      <button id="home-button" className="mdl-shadow--4dp"
      onClick={this.handleClick.bind(this,"go-home")}>
        <svg id="home-icon">
          <use xlinkHref={"#home-icon"}></use>
        </svg>
      </button>
      {buttonToShow}
    </div>
  )


  }
})

export {ResetButton};
