import {AppDispatcher} from "../dispatcher/app-dispatcher.js";
import {EventEmitter} from "events";
import assign from "object-assign";

const CHANGE_EVENT = "change";

// info for each path about the boxes inside and general status
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
// info for each box about where it is located and its status
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
    return { pathObj, boxes}
  },
  resetStore: function() {
    boxes.map( obj => {
      obj.checked = false;
      obj.mark = undefined;
      return obj;
    });
    console.log("reset");
  }
});

AppDispatcher.register(function(payload) {
  let {source,action} = payload;
  switch( action.actionType ){
    case "makeUserChoice" :
      let box = boxes.filter( bx => bx.id === action.data.boxId)[0];
      box.checked = true;
      box.mark = action.data.mark;
      box.markedColorClass = "teal-box";
      BoardStore.emitChange();
      break;
    case "makeCompChoice":
      break;
    default: null;
  }
  return true;
});

export {BoardStore}
