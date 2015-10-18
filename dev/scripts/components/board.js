import React from "react";
import {BoardStore} from "../stores/BoardStore.js";
import {BoardActions} from "../actions/BoardActions.js";
import {Box} from "./box.js"

let Board = React.createClass({
  getInitialState: function(){
    return {}
  },
  render: function(){
    let {pathObj,boxes} = this.props.data;
    return (
      <div className="board mdl-shadow--8dp">
        <div className="inner-board">
          {
            boxes.map(function(bx,i,arr) {
              return <Box data={this.props.data} boxInfo={bx} key={i}/>
            }.bind(this))
          }
        </div>
      </div>
    )
  }
})

export {Board};
