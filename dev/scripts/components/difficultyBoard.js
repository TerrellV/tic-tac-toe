import React from "react";
import {BoardStore} from "../stores/BoardStore.js";
import {BoardActions} from "../actions/BoardActions.js";
import ReactCSSTransitionGroup from "../../../node_modules/react/lib/ReactCSSTransitionGroup.js";

let DifficultyScreen = React.createClass({
  getInitialState: function() {
    return {};
  },
  handleClick: function(info) {
    // BoardActions.assignMarks(info)
  },
  render: function() {
    let {pathObj,boxes,boardToShow,gameSigns} = this.props.storeData;
    return (
      <ReactCSSTransitionGroup
      transitionName="example"
      transitionLeaveTimeout={1000}
      transitionEnterTimeout={1000}
      transitionAppear={true}
      transitionAppearTimeout={300}>
        <div id="difficulty-board" className="board mdl-shadow--8dp">
          Choose your difficulty
        </div>
      </ReactCSSTransitionGroup>
     )
  }
});

export {DifficultyScreen};
