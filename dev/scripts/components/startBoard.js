import React from "react";
import {BoardStore} from "../stores/BoardStore.js";
import {BoardActions} from "../actions/BoardActions.js";

let StartBoard = React.createClass({
  getInitialState: function() {
    return {};
  },
  handleClick: function(info) {
    BoardActions.assignMarks(info)
  },
  render: function() {
    let {pathObj,boxes,boardToShow,gameSigns} = this.props.storeData;
    let activeStatus = (gameSigns.user === 'x')? "x-active": "o-active";
    return (
      <div className="board start mdl-shadow--8dp">
        <div className={"board-options " + activeStatus}>
          <div className="options" id="option-x" onClick={this.handleClick.bind(this,"x")}>
            <svg className="mark-icon">
              <use xlinkHref={"#x-mark"}></use>
            </svg>
          </div>
          <div className="options" id="option-o" onClick={this.handleClick.bind(this,"o")}>
            <svg className="mark-icon">
              <use xlinkHref={"#o-mark"}></use>
            </svg>
          </div>
        </div>
        <div id="text-container">
          <p id="text">Choose Your Mark</p>
        </div>
      </div>
    )
  }
});

export {StartBoard};
