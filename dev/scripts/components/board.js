import React from "react";
import {StartBoard} from "./startBoard.js"
import {GameBoard} from "./gameBoard.js"
import {ResultsBoard} from "./resultsBoard.js"

let Board = React.createClass({
  getInitialState: function(){
    return {}
  },
  render: function(){
    let {pathObj,boxes,boardToShow,gameSigns} = this.props.storeData;

    switch(boardToShow){
      case "board":
        return <GameBoard storeData = { this.props.storeData}/>
        break;
      case "start":
        return <StartBoard storeData = {this.props.storeData}/>
        break;
      case "results":
      return <ResultsBoard storeData = {this.props.storeData}/>
        break;
      default : console.log('fell through board render switch')
    }
  }
})

export {Board};
