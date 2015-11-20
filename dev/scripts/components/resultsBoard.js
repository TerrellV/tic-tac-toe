import React from "react";
import {BoardStore} from "../stores/BoardStore.js";
import {BoardActions} from "../actions/BoardActions.js";
import ReactCSSTransitionGroup from "../../../node_modules/react/lib/ReactCSSTransitionGroup.js";

let ResultsBoard = React.createClass({
  getInitialState: function() {
    return {};
  },
  handleClick: function(info) {
    BoardActions.resetBoard();
  },
  render: function() {
    let {pathObj,boxes,boardToShow,gameSigns} = this.props.storeData;
    let outcome;
    if (this.props.storeData.winner === "user") {
      outcome = "You Won";
    } else if (this.props.storeData.winner === "computer") {
      outcome = "You Lost";
    } else {
      outcome = "Tie Game";
    }

    return (
      <ReactCSSTransitionGroup
      transitionName="slideUp"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
      transitionAppear={true}
      transitionAppearTimeout={2000}>
        <div id="results-board" className="board mdl-shadow--8dp" >
          <div id="text-container">
            <h2 id="results-text">{outcome}</h2>
            <h4 id="play-again-text" onClick={this.handleClick}>Play Again</h4>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    )
  }
});

export {ResultsBoard};
