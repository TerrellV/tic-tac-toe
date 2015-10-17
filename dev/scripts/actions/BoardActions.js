import {AppDispatcher} from "../dispatcher/app-dispatcher.js"
// import constants Here to use for names of actions. Havent added them yet


let BoardActions = {
  makeUserChoice: function(data){

    // manipulate data here then pass UserChoice to the stores

    AppDispatcher.handleViewAction({
      actionType: "makeUserChoice",
      data
    });
  },
  makeComputerChoice: function(data){

    // manipulate data here and pass compChoice to stores..

    AppDispatcher.handleViewAction({
      actionType: "makeComputerChoice",
      data
    });
  }
}

export {BoardActions};
