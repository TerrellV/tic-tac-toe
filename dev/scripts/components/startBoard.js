import React from "react";
import {BoardStore} from "../stores/BoardStore.js";
import {BoardActions} from "../actions/BoardActions.js";
import ReactCSSTransitionGroup from "../../../node_modules/react/lib/ReactCSSTransitionGroup.js";
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
      <ReactCSSTransitionGroup
      transitionName="start"
      transitionLeaveTimeout={1000}
      transitionEnterTimeout={1000}
      transitionAppear={true}
      transitionAppearTimeout={750}>
        <div id="options-board" className="board">
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
      </ReactCSSTransitionGroup>
     )
  }
});

export {StartBoard};
