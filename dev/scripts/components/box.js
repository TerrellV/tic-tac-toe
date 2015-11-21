import React from "react";
import {BoardStore} from "../stores/BoardStore.js";
import {BoardActions} from "../actions/BoardActions.js";

let Box = React.createClass({
  getInitialState: function(){
    return {playing: true}
  },
  tieActions: function(winner,board){
    BoardActions.setWinner(winner);
    BoardActions.showBoard(board);
  },
  winnerActions: function(winningRow,winner){
    // update the winner value in the store and halt any actions being fired by setting the playing variable in the store to false. The logic in handleclick relys on the true value of playing.

    // create promise with highlight-boxes action
    // change the state of the store to show winning board after highlight-boxes finishes

    BoardActions.setWinner(winner);
    BoardActions.highlight(winningRow);
  },
  handleClick: function(data){
    if (this.props.storeData.playing) {
      if ( this.props.boxInfo.checked === false){
        // check if board is still animating
        if (this.props.storeData.gameBoardStillAnimating === false) {
          BoardActions.delayClick(1100);
          data.boxInfo = this.props.boxInfo;
          // make the user choice
          BoardActions.makeUserChoice(data);

          let winningRow = this.props.storeData.check4Winner();

          if(winningRow){
            this.winnerActions(winningRow,"user");
          } else {
            // if user didn't win delay 1/2 second and make the computer choice
            window.setTimeout( function(){
              BoardActions.makeComputerChoice(data);
              let compWinningRow = this.props.storeData.check4Winner();
              if (compWinningRow) {
                this.winnerActions(compWinningRow,"computer");
              } else if (this.props.storeData.boardFilled()) {
                this.tieActions("tie","results");
              }
            }.bind(this), 500);
          }
          // if board is filled - show tie game
          if (this.props.storeData.boardFilled()) {
            console.log("board filled no winner");
            this.tieActions("tie","results");
          }
        }

      } else {console.error("BOX IS ALREADY CHECKED")}
    } else {console.error("SOMEONE ALREADY WON")}
  },
  render: function(){
    // add a specific class to each box
    let boxInfo = this.props.boxInfo;

    switch(boxInfo.checked) {
      case true:
      return (
        <div className={"box "+boxInfo.id+" "+boxInfo.bgColor}
        onClick={this.handleClick.bind(this,{boxId: boxInfo.id})}>
          <div className={"mark-box" + " " + boxInfo.markedColorClass}>
            <svg className="mark-icon">
              <use xlinkHref={"#"+boxInfo.mark+"-mark"}></use>
            </svg>
          </div>
        </div>
      )
      default:
        return (
          <div className={"box " + this.props.boxInfo.bgColor}
          onClick={this.handleClick.bind(this,{boxId: boxInfo.id})}>
          </div>
        );
    }


  }
});

export {Box}
