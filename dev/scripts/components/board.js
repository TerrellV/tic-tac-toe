import React from "react";
import {BoardStore} from "../stores/BoardStore.js";
import {BoardActions} from "../actions/BoardActions.js";
import {Box} from "./box.js"

let Board = React.createClass({
  getInitialState: function(){
    return {}
  },
  render: function(){
    let {pathObj,boxes} = this.props.storeData;
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
  }
})

export {Board};
