import React from "react";
import {BoardStore} from "../stores/BoardStore.js";
import {BoardActions} from "../actions/BoardActions.js";
import {Board} from "./board.js";

let App = React.createClass({
  componentDidMount: function() {
    BoardStore.addChangeListener(this._onChange)
  },
  componentWillUnmount: function() {

  },
  render: function(){
    return (
      <div id="app">
        <div id="board-container">
          <Board/>
        </div>
      </div>
    )
  },
  _onChange: function(){
    console.log("i noticed a change")
  }
});

export {App}
