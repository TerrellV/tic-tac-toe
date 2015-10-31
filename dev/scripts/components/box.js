import React from "react";
import {BoardStore} from "../stores/BoardStore.js";
import {BoardActions} from "../actions/BoardActions.js";

let Box = React.createClass({
  getInitialState: function(){
    return {}
  },
  handleClick: function(data){
    if (this.props.boxInfo.checked === false){

      data.storeData = this.props.storeData;
      data.boxInfo = this.props.boxInfo;

      BoardActions.makeUserChoice(data);
      BoardActions.makeComputerChoice(data);

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
