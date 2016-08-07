import React from "react";
import {StartBoard} from "./startBoard.js";
import {GameBoard} from "./gameBoard.js";
import {ResultsBoard} from "./resultsBoard.js";
import {DifficultyScreen} from "./difficultyBoard.js";
import ReactCSSTransitionGroup from "../../../node_modules/react/lib/ReactCSSTransitionGroup.js";

let Board = React.createClass({
  getInitialState: function(){
    return {}
  },
  render: function(){
    let { pathObj, boxes, boardToShow, gameSigns } = this.props.storeData;
    let activeBoard = <h1>nothing changed</h1>;
    switch(boardToShow){
      case "board":
        activeBoard = <GameBoard storeData = { this.props.storeData}/>
        break;
      case "start":
        activeBoard = <StartBoard storeData = {this.props.storeData}/>
        break;
      case "difficulty":
        activeBoard = <DifficultyScreen storeData = {this.props.storeData}/>
        break;
      case "results":
        activeBoard = <ResultsBoard storeData = {this.props.storeData}/>
        break;
      default : console.log('fell through board render switch')
    }

    return (
      <div id="master-board">
        {activeBoard}
      </div>
    )
  }
})

export {Board};
