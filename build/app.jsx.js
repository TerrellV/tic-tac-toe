// const Icon = require("react-svgicon");
"use strict";

var App = React.createClass({
  displayName: "App",

  getInitialState: function getInitialState() {
    // each path has info about what boxes it contains and how many are marked
    var pathObj = {
      "1": { "layout": ["tl", "ml", "bl"], "marks": 0 },
      "2": { "layout": ["tm", "mm", "bm"], "marks": 0 },
      "3": { "layout": ["tr", "mr", "br"], "marks": 0 },
      "4": { "layout": ["tl", "tm", "tr"], "marks": 0 },
      "5": { "layout": ["ml", "mm", "mr"], "marks": 0 },
      "6": { "layout": ["bl", "bm", "br"], "marks": 0 },
      "7": { "layout": ["tl", "mm", "br"], "marks": 0 },
      "8": { "layout": ["tr", "mm", "bl"], "marks": 0 }
    };
    // info for each box about where it is located and its status
    var boxes = [{ id: "tl", paths: ["1", "4", "7"], bgColor: "dark-box", activeClassColor: undefined, checked: false, mark: undefined }, { id: "tm", paths: ["2", "4"], bgColor: "light-box", activeClassColor: undefined, checked: false, mark: undefined }, { id: "tr", paths: ["3", "4", "8"], bgColor: "dark-box", activeClassColor: undefined, checked: false, mark: undefined }, { id: "ml", paths: ["1", "5"], bgColor: "light-box", activeClassColor: undefined, checked: false, mark: undefined }, { id: "mm", paths: ["2", "5", "7", "8"], bgColor: "dark-box", activeClassColor: undefined, checked: false, mark: undefined }, { id: "mr", paths: ["3", "5"], bgColor: "light-box", activeClassColor: undefined, checked: false, mark: undefined }, { id: "bl", paths: ["1", "6", "8"], bgColor: "dark-box", activeClassColor: undefined, checked: false, mark: undefined }, { id: "bm", paths: ["2", "6"], bgColor: "light-box", activeClassColor: undefined, checked: false, mark: undefined }, { id: "br", paths: ["3", "6", "7"], bgColor: "dark-box", activeClassColor: undefined, checked: false, mark: undefined }];

    return {
      pathObj: pathObj,
      boxes: boxes,
      firstMove: true
    };
  },
  update: function update(obj) {
    this.setState(obj);
  },
  reset: function reset() {
    // set first move to true;
    console.log("reset method was called");
    this.setState({ firstMove: true });
  },
  render: function render() {
    var appState = this.state;
    return React.createElement(
      "div",
      { id: "app" },
      React.createElement(
        "div",
        { id: "board-container" },
        React.createElement(Board, { appData: appState, reset: this.reset, update: this.update })
      ),
      React.createElement(ResetBtn, { reset: this.reset })
    );
  }
});

var Board = React.createClass({
  displayName: "Board",

  getInitialState: function getInitialState() {

    // boxes in corners
    var corners = ["tl", "tr", "bl", "br"];

    return {
      corners: corners,
      userIcon: "x"
    };
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "board mdl-shadow--8dp" },
      React.createElement(
        "div",
        { className: "inner-board" },
        this.props.appData.boxes.map((function (obj) {
          return React.createElement(Box, {
            boardState: this.state,
            appData: this.props.appData,
            update: this.props.update,
            boxInfo: obj
          });
        }).bind(this))
      )
    );
  }
});

var Box = React.createClass({
  displayName: "Box",

  getInitialState: function getInitialState() {
    return {};
  },
  componentDidUpdate: function componentDidUpdate(a, b) {
    // did update --- previous props(a), and state(b)
  },
  componentWillUpdate: function componentWillUpdate(a, b) {
    // will update --- new props(a), and state(b)
  },
  makeMoves: function makeMoves(userBoxId, event) {
    var props = this.props;
    // if its the first move then ...
    if (props.appData.firstMove) {
      // mark the box the user picked
      this.markBox(userBoxId, "x", "teal-box");
      // make the first move for computer
      this.firstCompMove(userBoxId);
    } else {
      if (!props.boxInfo.checked) {
        // make mark for user...
        this.markBox(userBoxId, "x", "teal-box");
        // make choice for comp
        var boxId = this.computerChoice();
        console.log(boxId);
        this.markBox(boxId, "o", "grey-box");
      }
    }
  },
  firstCompMove: function firstCompMove(userPickBoxId) {
    var markDelay = window.setTimeout(makeMove.bind(this), 500);
    function makeMove() {
      var props = this.props;
      var myBoxInfo = props.boxInfo;

      if (this.isCorner(userPickBoxId)) {
        this.markBox("mm", "o", "grey-box");
      } else {
        var corner = this.getLastCorner(myBoxInfo.paths);
        this.markBox(corner, "o", "grey-box");
      }
      this.props.update({ firstMove: false });
    }
  },
  twoInRow: function twoInRow() {
    // check for matches with computer
    // check for matches with user
    var masterReturn = false;
    var choiceObj = [1, 2, 3, 4, 5, 6, 7, 8].filter(checkPath.bind(this));
    return masterReturn;
    function checkPath(path) {
      var toReturn = false;
      // first ignore the paths that are filled
      var p = this.props.appData.pathObj[path];
      if (p.marks < 3) {
        // return arr is in this format [[box],[box],[box]]
        // this arr represents the path and the values in it
        var pathVals = p.layout.map(convert.bind(this));
        // here we are testing the path for duplicates...
        var response = pathVals.map(function (a, b, mapArr) {
          // the mark of the double found
          var mastMark = a[1];
          // this is the open box in the path of the double
          var openBox = mapArr.filter(function (ele) {
            return ele[1] !== a[1];
          })[0];
          var copy = mapArr.slice(0);
          // remove the item we are on...
          copy.splice(b, 1);
          // return the mark of the other items
          var dif = copy.map(function (ele) {
            return ele[1];
          });
          // if mark we are checking for is found again ...
          if (dif.indexOf(mastMark) > -1 && mastMark !== undefined) {
            console.log(mastMark + " is about to win. Play " + openBox + " to stop them");
            masterReturn = { openBox: openBox[0], isTrue: true, path: path };
          }
        }).filter(function (obj) {
          return obj !== undefined;
        });
      }
      function convert(a, b, c) {
        var mark = this.props.appData.boxes.filter(function (obj) {
          return a === obj.id;
        })[0].mark;
        return [a, mark];
      }
    };
  },
  isCorner: function isCorner(box) {
    return this.props.boardState.corners.indexOf(box) > -1 ? true : false;
  },
  getLastCorner: function getLastCorner(paths) {
    return paths.map(getPathsCorners.bind(this)).filter(function (a) {
      return a !== undefined;
    })[0]
    // only need one ie: the first one
    ;
    function getPathsCorners(pId) {
      var arr = this.props.appData.pathObj[pId].layout;
      return arr.filter(firstCorner.bind(this))[0];
      // only need one corner but all are returned
    }
    function firstCorner(box) {
      return this.isCorner(box);
    }
  },
  getOpenCorner: function getOpenCorner() {
    var boxes = this.props.appData.boxes;
    return this.props.boardState.corners.filter(function (cner) {
      // return the corner that is not checked
      return boxes.filter(function (a) {
        return a.id === cner;
      })[0].checked === false;
    })[0]; // even if multiple open corners, any open one is fine thats why I choose 0 index
  },
  markBox: function markBox(boxId, mark, colorClass) {
    // setting variables for master app data
    var _props$appData = this.props.appData;
    var boxes = _props$appData.boxes;
    var pathObj = _props$appData.pathObj;

    // set the box id to checked and give it a mark
    var box = boxes.filter(function (a) {
      return boxId === a.id;
    })[0];
    box.checked = true;
    box.mark = mark;
    box.activeClassColor = colorClass;
    // add one to the each path that has a mark in it via the path object.marks property
    box.paths.map(function (a) {
      pathObj[a].marks++;
    });

    // update master object with the new board info
    this.props.update({ pathObj: pathObj, boxes: boxes });

    var pId = this.state.id;
    // this.pushToHistory(box,mark);
  },
  computerChoice: function computerChoice() {
    // this choice does not include the computers first move
    // however all the other computer moves come through here
    //deciding on computers next move
    var checkForTwo = this.twoInRow();
    if (checkForTwo.isTrue) {
      return checkForTwo.openBox;
    } else if (this.getOpenCorner()) {
      return this.getOpenCorner();
    } else {
      // go in open spot
    }
  },
  // check if any streaks in various paths function based on paths to check
  // view notes for applicable changes...
  checkPaths: function checkPaths(arr, event) {

    var set = arr.map(function (pathId) {

      var pathArr = this.state.boardPaths[pathId];

      if (check3InRow(pathArr)) {
        console.log(pathArr[0].toUpperCase() + "'s Won on path", pathId);
      }

      return check3InRow(pathArr);
    });
    // possible mixin used ...
    function check3InRow(arr) {
      var match = true;
      if (arr.length > 2) {
        arr.reduce(function (acc, val) {
          if (acc !== val) {
            match = false;
          }
          return val;
        });
      }
      return match;
    }

    return set;
  },
  render: function render() {
    var s = this.state;
    var myBoxInfo = this.props.boxInfo;
    // if its checked render the box with the checked box inside
    if (this.props.boxInfo.checked) {
      return React.createElement(
        "div",
        { className: "box " + myBoxInfo.id + " " + myBoxInfo.bgColor,
          onClick: this.makeMoves.bind(this, myBoxInfo.id) },
        React.createElement(
          "div",
          { className: "mark-box" + " " + myBoxInfo.activeClassColor },
          React.createElement(
            "svg",
            { className: "mark-icon" },
            React.createElement("use", { xlinkHref: "#" + myBoxInfo.mark + "-mark" })
          )
        )
      );
    }
    // else render the empty box
    else {
        return React.createElement("div", { className: "box " + myBoxInfo.id + " " + myBoxInfo.bgColor,
          onClick: this.makeMoves.bind(this, myBoxInfo.id) });
      }
  }
});

var ResetBtn = React.createClass({
  displayName: "ResetBtn",

  render: function render() {
    return React.createElement(
      "button",
      { id: "reset-btn", onClick: this.props.reset },
      React.createElement(
        "span",
        { id: "reset-btn-text" },
        "Reset"
      )
    );
  }
});

React.render(React.createElement(App, null), document.getElementById('main'));

// planning and working things out below ...
//# sourceMappingURL=app.jsx.js.map
