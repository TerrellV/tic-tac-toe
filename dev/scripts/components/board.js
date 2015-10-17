import React from "react";
import {BoardStore} from "../stores/BoardStore.js";
import {BoardActions} from "../actions/BoardActions.js";
import {Box} from "./box.js"

let Board = React.createClass({
  getInitialState: function(){
    return {}
  },
  render: function(){
    return (
      <div className="board mdl-shadow--8dp">
        <div className="inner-board">
          <Box/>
        </div>
      </div>
    )
  }
})

export {Board};
