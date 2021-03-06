import React from "react";
import {BoardStore} from "../stores/BoardStore.js";
import {BoardActions} from "../actions/BoardActions.js";
import {Box} from "./box.js";
import ReactCSSTransitionGroup from "../../../node_modules/react/lib/ReactCSSTransitionGroup.js";

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
      <ReactCSSTransitionGroup
      transitionName="slide"
      transitionLeaveTimeout={1000}
      transitionEnterTimeout={2000}
      transitionAppear={true}
      transitionAppearTimeout={2000}>
        <div id="game-board" className="board mdl-shadow--8dp" >
          <div className="inner-board" key="1">
            {
              boxes.map(function(bx,i,arr) {
                return <Box storeData={this.props.storeData} boxInfo={bx} key={i}/>
              }.bind(this))
            }
          </div>
        </div>
      </ReactCSSTransitionGroup>
    )
  }
});

export {GameBoard};
