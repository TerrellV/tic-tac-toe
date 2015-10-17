// var Dispatcher = require('flux').Dispatcher;
import {Dispatcher} from "flux";
import assign from "object-assign";

let AppDispatcher  = assign(new Dispatcher(), {
  handleViewAction: function(action){
    console.log('dispatching action to all the stores...');
    this.dispatch({
      source: 'VIEW_ACTION',
      action
    })
  }
});

export {AppDispatcher};
