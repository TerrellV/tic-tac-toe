import React from "react";
import {BoardStore} from "../stores/BoardStore.js";
import {BoardActions} from "../actions/BoardActions.js";

let Box = React.createClass({
  getInitialState: function(){
    return {}
  },
  handleClick: function(action){

  },
  render: function(){
    // add a specific class do each box class
    return (
      <div className={"box"}
      onClick={ this.handleClick }>
      </div>
    )
  }
});

export {Box}
