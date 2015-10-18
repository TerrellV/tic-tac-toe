// var Dispatcher = require('flux').Dispatcher;
import {Dispatcher} from "flux";
import assign from "object-assign";

let AppDispatcher  = assign(new Dispatcher(), {
  handleViewAction: function(action){
    this.dispatch({
      source: 'VIEW_ACTION',
      action
    })
  }
});

export {AppDispatcher};
