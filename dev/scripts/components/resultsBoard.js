import React from "react";
import {BoardStore} from "../stores/BoardStore.js";
import {BoardActions} from "../actions/BoardActions.js";
import ReactCSSTransitionGroup from "../../../node_modules/react/lib/ReactCSSTransitionGroup.js";

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
      <ReactCSSTransitionGroup
      transitionName="slide"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
      transitionAppear={true}
      transitionAppearTimeout={2000}>
        <div id="results-board" className="board mdl-shadow--8dp" >
          something
        </div>
      </ReactCSSTransitionGroup>
    )
  }
});

export {ResultsBoard};
