import React from "react";
import {BoardStore} from "../stores/BoardStore.js";
import {BoardActions} from "../actions/BoardActions.js";
import {Box} from "./box.js";

let GameBoard = React.createClass({
  getInitialState: function() {
    return {};
  },
  handleClick: function(info) {
    BoardActions.assignMarks(info)
  },
  render: function() {
    let {pathObj,boxes,boardToShow,gameSigns} = this.props.storeData;
    return (
      <div className="board mdl-shadow--8dp">
        <div className="inner-board">
          {
            boxes.map(function(bx,i,arr) {
              return <Box storeData={this.props.storeData} boxInfo={bx} key={i}/>
            }.bind(this))
          }
        </div>
      </div>
    )
  }
});

export {GameBoard};
