import React from "react";
import {BoardStore} from "../stores/BoardStore.js";
import {BoardActions} from "../actions/BoardActions.js";
import {Board} from "./board.js";

let App = React.createClass({
  getInitialState: function() {
    return {
      storeData: this.getStoreData()
    }
  },
  componentDidMount: function() {
    BoardStore.addChangeListener(this._onMark)
  },
  componentWillUnmount: function() {
    BoardStore.removeChangeListener(this._remove)
  },
  getStoreData: function(){
    return BoardStore.getState();
  },
  render: function(){
    return (
      <div id="app">
        <div id="board-container">
          <Board data={this.state.storeData}/>
        </div>
      </div>
    )
  },
  _onMark: function(){
    this.setState({storeData : this.getStoreData()});
  },
  _remove: function(){
    //
  }
});

export {App}
