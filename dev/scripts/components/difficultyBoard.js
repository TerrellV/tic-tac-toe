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
      transitionEnterTimeout={2000}
      transitionAppear={true}
      transitionAppearTimeout={2000}>
        <div id="difficulty-board" className="board mdl-shadow--8dp">
          <div className={"pannels " + activePannel }>

            <div className={"diff-pannel"} id="easy"
            onClick={this.handleClick.bind(this,"easy")}>
              <svg className="icons" id="happy-face-icon">
                <use xlinkHref={"#happy-face-icon"}></use>
              </svg>
              <h2 id="easy-text" className="pannel-text">
                Easy
              </h2>
            </div>

            <div className={"diff-pannel"} id="regular"
            onClick={this.handleClick.bind(this,"regular")}>
              <svg className="icons" id="num-pad-icon">
                <use xlinkHref={"#num-pad-icon"}></use>
              </svg>
              <h2 id="regular-text" className="pannel-text">
                Regular
              </h2>
            </div>

            <div className={"diff-pannel"} id="impossible"
            onClick={this.handleClick.bind(this,"impossible")}>
              <svg className="icons" id="fire-icon">
                <use xlinkHref={"#fire-icon"}></use>
              </svg>
              <h2 id="impossible-text" className="pannel-text">
                Impossible
              </h2>
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
