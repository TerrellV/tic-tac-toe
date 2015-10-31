import React from "react";
import {BoardStore} from "../stores/BoardStore.js";
import {BoardActions} from "../actions/BoardActions.js";

let ResetButton = React.createClass({
  getInitialState: function(){
    return {}
  },
  handleClick: function() {
    console.log('Reset Clicked');
    BoardActions.resetBoard();
  },
  render: function(){
    return (
      <div>
        <button id="reset-btn" onClick={this.handleClick}>
          <p id="reset-btn-text">Reset</p>
        </button>
      </div>
    )
  }
})

export {ResetButton};
