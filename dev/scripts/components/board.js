import React from "react";
import {BoardStore} from "../stores/BoardStore.js";
import {BoardActions} from "../actions/BoardActions.js";
import {Box} from "./box.js"

let Board = React.createClass({
  getInitialState: function(){
    return {}
  },
  render: function(){
    let {pathObj,boxes,boardToShow} = this.props.storeData;
    switch(boardToShow){
      case "start":
        return (
          <div className="board start mdl-shadow--8dp">
            <div className="inner-board">
              {
                boxes.map(function(bx,i,arr) {
                  return <Box storeData={this.props.storeData} boxInfo={bx} key={i}/>
                }.bind(this))
              }
            </div>
          </div>
        )
        break;
      case "board":
        return (
          <div className="board mdl-shadow--8dp">
            <div className="inner-board">
              {
                boxes.map(function(bx,i,arr) {
                  return <Box storeData={this.props.storeData} boxInfo={bx} key={i}/>
                }.bind(this))
              }
            </div>
          </div>
        )
        break;
      case "results":
        return (
          <div className="board results mdl-shadow--8dp">
            <div className="inner-board">
              {
                boxes.map(function(bx,i,arr) {
                  return <Box storeData={this.props.storeData} boxInfo={bx} key={i}/>
                }.bind(this))
              }
            </div>
          </div>
        )
        break;
      default : console.log('fell through board render switch')
    }
  }
})

export {Board};
