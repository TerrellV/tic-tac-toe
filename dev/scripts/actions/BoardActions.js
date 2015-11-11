import {AppDispatcher} from "../dispatcher/app-dispatcher.js"
import {BoardStore} from "../stores/BoardStore.js";
// import constants Here to use for names of actions. Havent added them yet

let BoardActions = {
  assignMarks: function(data){
    AppDispatcher.handleViewAction({
      actionType: "assignMarks",
      data
    });
  },
  makeUserChoice: function(data){
    AppDispatcher.handleViewAction({
      actionType: "makeUserChoice",
      data
    });
  },
  makeComputerChoice: function(data){
    AppDispatcher.handleViewAction({
      actionType: "makeComputerChoice",
      data
    });
  },
  resetBoard: function(data){
    AppDispatcher.handleViewAction({
      actionType: "resetBoard",
      data
    });
  }
}

export {BoardActions};
