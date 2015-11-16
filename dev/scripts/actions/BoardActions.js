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
  showDifficultyBoard: function(data){
    AppDispatcher.handleViewAction({
      actionType: "showDifficultyBoard",
      data
    });
  },
  setDifficulty: function(data){
    AppDispatcher.handleViewAction({
      actionType: "setDifficulty",
      data
    });
  },
  delayClick: function(data){
    AppDispatcher.handleViewAction({
      actionType: "delayClick",
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
  startBoard: function(data){
    AppDispatcher.handleViewAction({
      actionType: "startBoard",
      data
    });
  },
  resetBoard: function(data){
    AppDispatcher.handleViewAction({
      actionType: "resetBoard",
      data
    });
  },
  goHome: function(data){
    AppDispatcher.handleViewAction({
      actionType: "goHome",
      data
    });
  }
}

export {BoardActions};
