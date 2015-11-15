import React from "react";
import {BoardStore} from "../stores/BoardStore.js";
import {BoardActions} from "../actions/BoardActions.js";

let ResetButton = React.createClass({
  getInitialState: function(){
    return {
      loading: true,
    }
  },
  handleClick: function( action, data ) {
    let actions = [
      {name:"reset", fn:BoardActions.resetBoard},
      {name:"chooseDifficulty", fn:BoardActions.showDifficultyBoard},
      {name:"start", fn:BoardActions.startBoard.bind(this,200)}
    ];
    actions.filter( actObj => actObj.name === action)[0].fn();
  },
  render: function(){
    if (this.props.storeData.boardToShow === "start") {
      return (
        <div>
          <button className="reset-btn" onClick={this.handleClick.bind(this,"chooseDifficulty")}>
            <p id="reset-btn-text">Next</p>
          </button>
        </div>
      )
    }
    else if (this.props.storeData.boardToShow === "difficulty"){
      return (
        <div>
          <button className="reset-btn fill" onClick={this.handleClick.bind(this,"reset")}>
            <p id="reset-btn-text">Start</p>
          </button>
        </div>
      )
    } else {
      return (
        <div>
          <button className="reset-btn fill" onClick={this.handleClick.bind(this,"reset")}>
            <p id="reset-btn-text">Reset</p>
          </button>
        </div>
      )
    }
  }
})

export {ResetButton};
