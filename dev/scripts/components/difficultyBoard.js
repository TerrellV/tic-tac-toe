import React from "react";
import {BoardStore} from "../stores/BoardStore.js";
import {BoardActions} from "../actions/BoardActions.js";
import ReactCSSTransitionGroup from "../../../node_modules/react/lib/ReactCSSTransitionGroup.js";

let DifficultyScreen = React.createClass({
  getInitialState: function() {
    return {

    };
  },
  handleClick: function(diff) {
    BoardActions.setDifficulty(diff)
  },
  render: function() {
    let {pathObj,boxes,boardToShow,gameSigns} = this.props.storeData;
    let pannels = {
      easy: {deff: "e-active"},
      regular: {deff: "r-active"},
      impossible: {deff: "i-active"},
    }

    let CurrentDiff = this.props.storeData.difficulty;

    let activePannel = Object.keys(pannels).map( diff => {
      return (diff === CurrentDiff)? pannels[diff].deff : undefined;
    }).filter( n => n !== undefined)[0];

    return (
      <ReactCSSTransitionGroup
      transitionName="slide"
      transitionLeaveTimeout={1000}
      transitionEnterTimeout={1000}
      transitionAppear={true}
      transitionAppearTimeout={300}>
        <div id="difficulty-board" className="board mdl-shadow--8dp">
          <div className={"pannels " + activePannel }>
            <div className={"diff-pannel"} id="easy"
            onClick={this.handleClick.bind(this,"easy")}>
            </div>
            <div className={"diff-pannel"} id="regular"
            onClick={this.handleClick.bind(this,"regular")}>
            </div>
            <div className={"diff-pannel"} id="impossible"
            onClick={this.handleClick.bind(this,"impossible")}>
            </div>
          </div>
          <div id="text-container">
            <p id="text">Choose Your Difficulty</p>
          </div>
        </div>
      </ReactCSSTransitionGroup>
     )
  }
});

export {DifficultyScreen};
