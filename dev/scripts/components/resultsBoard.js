import React from "react";
import {BoardStore} from "../stores/BoardStore.js";
import {BoardActions} from "../actions/BoardActions.js";

let ResultsBoard = React.createClass({
  getInitialState: function() {
    return {};
  },
  handleClick: function(info) {
    BoardActions.assignMarks(info)
  },
  render: function() {
    let {pathObj,boxes,boardToShow,gameSigns} = this.props.storeData;

    return (
      <div id="results-board" className="mdl-shadow--8dp">

      </div>
    )
  }
});

export {ResultsBoard};
