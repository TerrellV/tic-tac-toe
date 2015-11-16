import React from "react";
import {BoardStore} from "../stores/BoardStore.js";
import {BoardActions} from "../actions/BoardActions.js";

let Box = React.createClass({
  getInitialState: function(){
    return {loading: true}
  },
  handleClick: function(data){
    if ( this.props.boxInfo.checked === false){
      // check if board is still animating
      if (this.props.storeData.gameBoardStillAnimating === false) {
        BoardActions.delayClick(1100);
        data.boxInfo = this.props.boxInfo;
        // make the user choice
        BoardActions.makeUserChoice(data);
        debugger;
        let doesWinningRowExist = this.props.storeData.check4Winner();
        if(doesWinningRowExist){
          console.log('winner');
          // fire action to highlight-boxes
          // then fire action to show the results .. or make the results board appar
        } else {
          // if user didn't win delay 1/2 second and make the computer choice
          window.setTimeout(BoardActions.makeComputerChoice.bind(this,data), 500);
        }
      }

    } else {console.error("BOX IS ALREADY CHECKED")}
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
