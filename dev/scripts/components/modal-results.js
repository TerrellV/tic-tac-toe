import React from "react";
import {BoardStore} from "../stores/BoardStore.js";
import {BoardActions} from "../actions/BoardActions.js";

let Modal = React.createClass({
  render: function(){
    return (this.props.storeData.showingResults)
      ? <div className="result-container">
          <div className="result-modal" ></div>
        </div>
      : <div className="result-container hide">
          <div className="result-modal" ></div>
        </div>;
  }
})

export{Modal};
