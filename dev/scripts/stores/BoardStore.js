import {AppDispatcher} from "../dispatcher/app-dispatcher.js";
import {EventEmitter} from "events";
import assign from "object-assign";

const CHANGE_EVENT = "change";

/*///////////////////////////////
  private store values
 ///////////////////////////////*/
let pathObj = {
  "1": {"layout": ["tl","ml","bl"], "marks": 0 },
  "2": {"layout": ["tm","mm","bm"], "marks": 0 },
  "3": {"layout": ["tr","mr","br"], "marks": 0 },
  "4": {"layout": ["tl","tm","tr"], "marks": 0 },
  "5": {"layout": ["ml","mm","mr"], "marks": 0 },
  "6": {"layout": ["bl","bm","br"], "marks": 0 },
  "7": {"layout": ["tl","mm","br"], "marks": 0 },
  "8": {"layout": ["tr","mm","bl"], "marks": 0 }
};
let boxes = [
  {id:"tl", paths:["1","4","7"], bgColor:"dark-box", markedColorClass:undefined, checked:false, mark:undefined},
  {id:"tm", paths:["2","4"], bgColor:"light-box", markedColorClass:undefined, checked:false, mark:undefined},
  {id:"tr", paths:["3","4","8"], bgColor:"dark-box", markedColorClass:undefined, checked:false, mark:undefined},
  {id:"ml", paths:["1","5"], bgColor:"light-box", markedColorClass:undefined, checked:false, mark:undefined},
  {id:"mm", paths:["2","5","7","8"], bgColor:"dark-box", markedColorClass:undefined, checked:false, mark:undefined},
  {id:"mr", paths:["3","5"], bgColor:"light-box", markedColorClass:undefined, checked:false, mark:undefined},
  {id:"bl", paths:["1","6","8"], bgColor:"dark-box", markedColorClass:undefined, checked:false, mark:undefined},
  {id:"bm", paths:["2","6"], bgColor:"light-box", markedColorClass:undefined, checked:false, mark:undefined},
  {id:"br", paths:["3","6","7"], bgColor:"dark-box", markedColorClass:undefined, checked:false, mark:undefined}
];

// regular makes user choose random option unless its about to win
// impossible evaluates the board for the win, to play defense, and then make a choice based on the status of the marks on the board.... The user can not win :)
const difficulties = [
  {type:"easy", fn:computerLogicEasy},
  {type:"regular", fn:computerLogicRegular},
  {type:"impossible", fn:computerLogicImpossible}
];
let difficulty = difficulties[0].type;

// default game signs
let gameSigns = {
  user: "x",
  comp: "o"
}
let corners = ["tl","tr","bl","br"];
let middleEdges = ["tm","ml","mr","bm"];
let boardToShow = "start";
let gameBoardStillAnimating = false;
let playing = true;
let winner = null;

/* ALL COMPUTER LOGIC PSEUDO CODE

  * if first move check..
    * if user picks corner - pick middle
    * else pick the first corner in paths
  * Switch Check if there are two of the same marks in any paths (ignore full paths)
  * case if computer can win then make the winning move
  * case if user can win, make the defensive move
  * case if no winning spot
    * switch who holds the middle spot
      * case if nobody holds middle go middle
      * case if user holds middle go corner
      * case if comp holds middle go non corner
*/


/*///////////////////////////////
  logic functions that returns the computers move
 ///////////////////////////////*/

function computerLogicImpossible(payload){
  let {source,action} = payload;
  let {actionType,data} = action;

  let evalBoard = evaluateForTwoInPath();

  switch( evalBoard.moveType ){
    case "computerWin":
      return evalBoard.move;
    case "blockUser":
      return evalBoard.move;
    case "CheckMiddle":
      switch(boxes.filter( box => box.id === "mm")[0].mark) {
        case gameSigns.comp:
          return getOpenEdge() || getOpenCorner();
        case gameSigns.user:
          return getOpenCorner() || getOpenEdge();
        default:
          return "mm";
      };
      break;
    default: console.error("Fell Through Switch Logic");;
  }
}
function computerLogicEasy(payload) {
  // if the offensive win is open, take it
  // else, pick a randome open box
  let boardCheck = evaluateForTwoInPath();
  return (boardCheck.moveType === "computerWin")? boardCheck.move : getRandomOpenBox();
}
function computerLogicRegular(payload) {
  // make the defensive move
  // make the offensive move
  // go in open spot ...

  let evalBoard = evaluateForTwoInPath();

  switch( evalBoard.moveType ){
    case "computerWin":
      return evalBoard.move;
    case "blockUser":
      return evalBoard.move;
    default :
      return getRandomOpenBox();
  }
}

/*///////////////////////////////
  functions for updating store's state
 ///////////////////////////////*/

function setDifficulty(payload){
  if (difficulties.map(a => a.type).indexOf(payload.action.data) > -1 ) {
    difficulty = payload.action.data;
  }
  else console.error("payload recieved not accurate for setting difficulty")
}
function updateUserPick(payload){
  let {source,action} = payload;
  let {actionType, data} = action;

  let box = boxes.filter( bx => bx.id === data.boxId)[0];
  box.checked = true;
  box.mark = gameSigns.user;
  box.markedColorClass = "teal-box";
  addOneToMarkCountForEachPath(box);
}
function updateComputerPick(boxToMark){
  let boxObj = boxes.filter( bx => bx.id === boxToMark)[0];
  boxObj.checked = true;
  boxObj.mark = gameSigns.comp;
  boxObj.markedColorClass = "grey-box";
  addOneToMarkCountForEachPath(boxObj);
}
function waitForAnimationToFinish (payload, resolve, reject) {
  let delay = payload.action.data;
  gameBoardStillAnimating = true;
  window.setTimeout( a => {
    resolve(false);
  },delay);
}
function addOneToMarkCountForEachPath(boxObj) {
  boxObj.paths.map( path => { pathObj[path].marks++ } )
}
function resetGameBoard(){
  winner = undefined;
  playing = true;
  boardToShow = "board";
  boxes.map( obj => {
    obj.checked = false;
    obj.mark = undefined;
    return obj;
  });
  Object.keys(pathObj).map( path => {pathObj[path].marks = 0});
}
function goHomeResetBoard(){
  // not resetting everything
  resetGameBoard();
  showBoard("start");
}
function delayShowResults(winningRow,resolve,reject){
  pathObj[winningRow].layout.map(box => { getBoxObj(box).markedColorClass = "highlight-box"});

  window.setTimeout( a => {
    boardToShow = "results";
    resolve(true);
  },2000);

}
function setWinner(payload){
  let {action:{data}} = payload;
  playing = false;
  winner = data;
}
function assignMarks(userMarkPayload) {
  let { action:{data,actionType} } = userMarkPayload;
  gameSigns.user = data;
  gameSigns.comp = (data === "x")? "o" : "x";
}
function showBoard( board ){
  boardToShow = board;
}


/*///////////////////////////////
  function for checking the state
 ///////////////////////////////*/

function check4Winner(){
  let isStreak = Object.keys(pathObj).map( path => {
    if (pathObj[path].marks === 3 ) {
      let test = pathObj[path].layout.map( box => getBoxObj(box).mark)
        .reduce( (acc,a) => acc === a ? a : false );
      return test === "o" || test === "x"? path : undefined
    }
  }).filter( val => val !== undefined)[0];

  return isStreak || false;
}


/*///////////////////////////////
  accessory functions
 ///////////////////////////////*/

function getFirstCorner(paths) {
  return (
    paths.map( getPathsCorners.bind(this) )
      .filter( a => a !== undefined )[0] // only need one ie: the first one
  )
  function getPathsCorners( pId ){
    let arr = pathObj[pId].layout;
    return arr.filter( box => corners.indexOf(box) !== -1 )[0]
    // only need one corner but all are returned
  }
}
function evaluateForTwoInPath() {

  let checkComp = check4Two(gameSigns.comp);
  let checkUser = check4Two(gameSigns.user);

  if (checkComp) { return {moveType: "computerWin", move: checkComp} }
  else if(checkUser) { return {moveType: "blockUser", move: checkUser} }

  return {moveType: "CheckMiddle"};

  function check4Two(mark){
    let paths = Object.keys(pathObj);
    let solutionBox = paths.map( (path,i,arr)  => {
      if (pathObj[path].marks < 3){
        let boxesToCheck = pathObj[path].layout;

        // filter boxes that match the mark being tested
        let matches = boxesToCheck.filter( (boxId,i,arr) => {
          let boxObj = boxes.filter( box => box.id === boxId)[0];
          return boxObj.mark === mark;
        });

        if (matches.length > 1) {
          return boxesToCheck.filter( box => matches.indexOf(box) === -1 )[0];
        }
      }
    }).filter( id => id !== undefined )[0];

    return solutionBox;
  }
}
function getRandomOpenBox(){
  // return array of open box id's
  let openBoxes = boxes.filter( boxObj => boxObj.mark === undefined )
    .map( boxObj => boxObj.id);

  let randomIndex = Math.floor(Math.random() * (openBoxes.length) );
  return openBoxes[randomIndex];
}
function getOpenCorner(){
  return corners.filter( box => {
    return boxes.filter( a => a.id === box )[0].mark === undefined
  })[0];
}
function getOpenEdge(){
  return middleEdges.filter(box => {
     return boxes.filter( a => a.id === box )[0].mark === undefined
  })[0];
}
function getBoxObj(id){
  return boxes.filter( box => box.id === id)[0]
}


/*///////////////////////////////
  board store to be exported
 ///////////////////////////////*/

let BoardStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(CmpCallBk) {
    this.on(CHANGE_EVENT,CmpCallBk);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT,callback)
  },
  getState: function() {
    return { pathObj, boxes, corners, middleEdges, gameSigns, boardToShow, difficulties, difficulty, gameBoardStillAnimating, playing, winner, check4Winner}
  }
});


/*///////////////////////////////
  register the store with dispatcher
  determine action based on action recieved
 ///////////////////////////////*/

AppDispatcher.register(function(payload) {
  switch( payload.action.actionType ){
    case "assignMarks" :
      assignMarks(payload);
      BoardStore.emitChange();
      break;
    case "showDifficultyBoard" :
      showBoard('difficulty');
      BoardStore.emitChange();
      break;
    case "setDifficulty" :
      setDifficulty(payload);
      BoardStore.emitChange();
      break;
    case "startBoard" :
      showBoard('board');
      BoardStore.emitChange();
      break;
    case "delayClick" :
      let prom = new Promise( waitForAnimationToFinish.bind(this,payload) );
      BoardStore.emitChange();
      prom.then( resolved => {
        gameBoardStillAnimating = resolved;
        BoardStore.emitChange();
      });
      break;
    case "makeUserChoice" :
      updateUserPick(payload);
      BoardStore.emitChange();
      break;
    case "makeComputerChoice":
      // sets computer choice to necessary function result based on what difficult is set and its preset function defined in the state ...
      let compChoice = difficulties.filter( diffs => diffs.type === difficulty )[0].fn(payload);
      updateComputerPick(compChoice);
      BoardStore.emitChange();
      break;
    case "setWinner":
      setWinner(payload);
      BoardStore.emitChange();
      break;
    case "highlight":
      new Promise(delayShowResults.bind(this,payload.action.data))
        .then(function(resolved){
          BoardStore.emitChange();
        });
      BoardStore.emitChange();
      break;
    case "resetBoard":
      resetGameBoard();
      BoardStore.emitChange();
      break;
    case "goHome":
      goHomeResetBoard();
      BoardStore.emitChange();
      break;
    default: console.log("Action not recognized by BoardStore or logic fell through");
  }

  return true;
});

export {BoardStore}
