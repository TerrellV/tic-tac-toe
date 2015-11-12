import React from "react";
import {BoardStore} from "../stores/BoardStore.js";
import {BoardActions} from "../actions/BoardActions.js";

let ResetButton = React.createClass({
  getInitialState: function(){
    return {
      loading: true
    }
  },
  handleClick: function( action ) {
    (action === "reset")
      ? BoardActions.resetBoard()
      : BoardActions.startBoard(200);
  },
  render: function(){
    if (this.props.storeData.boardToShow === "start") {
      return (
        <div>
          <button className="reset-btn" onClick={this.handleClick.bind(this,"start")}>
            <p id="reset-btn-text">Start</p>
          </button>
        </div>
      )
    }
    else {
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
