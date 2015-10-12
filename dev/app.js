// const Icon = require("react-svgicon");
let App = React.createClass({
  getInitialState:function(){
    // each path has info about what boxes it contains and how many are marked
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
      {id:"tl", paths:["1","4","7"], bgColor:"dark-box", activeClassColor:undefined, checked:false, mark:undefined},
      {id:"tm", paths:["2","4"], bgColor:"light-box", activeClassColor:undefined, checked:false, mark:undefined},
      {id:"tr", paths:["3","4","8"], bgColor:"dark-box", activeClassColor:undefined, checked:false, mark:undefined},
      {id:"ml", paths:["1","5"], bgColor:"light-box", activeClassColor:undefined, checked:false, mark:undefined},
      {id:"mm", paths:["2","5","7","8"], bgColor:"dark-box", activeClassColor:undefined, checked:false, mark:undefined},
      {id:"mr", paths:["3","5"], bgColor:"light-box", activeClassColor:undefined, checked:false, mark:undefined},
      {id:"bl", paths:["1","6","8"], bgColor:"dark-box", activeClassColor:undefined, checked:false, mark:undefined},
      {id:"bm", paths:["2","6"], bgColor:"light-box", activeClassColor:undefined, checked:false, mark:undefined},
      {id:"br", paths:["3","6","7"], bgColor:"dark-box", activeClassColor:undefined, checked:false, mark:undefined}
    ];

    return {
      pathObj,
      boxes,
      firstMove:true
    }
  },
  update: function(obj){
    this.setState(obj);
  },
  reset: function(){
    // set first move to true;
    console.log("reset method was called");
    this.setState({firstMove:true});
  },
  render:function() {
    let appState = this.state;
    return (
      <div id="app">
        <div id="board-container">
          <Board appData={appState} reset={this.reset} update={this.update} />
        </div>
        <ResetBtn reset={this.reset}/>
      </div>
    )
  }
});

let Board = React.createClass({
  getInitialState: function(){

    // boxes in corners
    const corners = ["tl","tr","bl","br"];

    return {
      corners,
      userIcon: "x",
    }
  },
  render:function() {
    return (
      <div className="board mdl-shadow--8dp">
        <div className="inner-board">
          {this.props.appData.boxes.map(function(obj){
            return (
              <Box
              boardState={this.state}
              appData={this.props.appData}
              update={this.props.update}
              boxInfo={obj}
              />
            )
          }.bind(this))}
        </div>
      </div>
    )
  }
});

let Box = React.createClass({
  getInitialState: function(){
    return {}
  },
  makeMoves: function(userBoxId,event){
    let props = this.props;
    // if its the first move then ...
    if (props.appData.firstMove) {
      // mark the box the user picked
      this.markBox(userBoxId,"x","teal-box");
      // make the first move for computer
      this.firstCompMove(userBoxId);
    } else {
      if ( !props.boxInfo.checked) {
        // make mark for user...
        this.markBox(userBoxId,"x","teal-box");
        // make choice for comp
        let boxId = this.computerChoice();
        this.markBox(boxId,"o","grey-box")
      }
    }
  },
  firstCompMove: function(userPickBoxId) {
    let markDelay = window.setTimeout(makeMove.bind(this),500);
    function makeMove(){
      const props = this.props;
      let myBoxInfo = props.boxInfo;

      if( this.isCorner(userPickBoxId) ){
        this.markBox("mm", "o","grey-box");
      } else {
        var corner = this.getLastCorner(myBoxInfo.paths);
        this.markBox(corner, "o","grey-box");
      }
      this.props.update({firstMove:false});
    }
  },
  twoInRow: function(){
    // check for matches with computer
    // THEN check for matches with user
    var masterReturn = false;
    let choiceObj = [1,2,3,4,5,6,7,8].filter(checkPath.bind(this));
    return masterReturn;
    function checkPath( path ) {
      let toReturn = false;
      // first ignore the paths that are filled
      let p = this.props.appData.pathObj[ path ];
      if ( p.marks < 3 ) {
        // return arr is in this format [[box],[box],[box]]
        // this arr represents the path and the values in it
        let pathVals = p.layout.map(convert.bind(this));
        // here we are testing the path for duplicates...
        let response = pathVals.map(function(a,b,mapArr){
          // the mark of the double found
          let mastMark = a[1];
          // this is the open box in the path of the double
          let openBox = mapArr.filter( ele => ele[1] !== a[1])[0];
          let copy = mapArr.slice(0);
          // remove the item we are on...
          copy.splice(b,1);
          // return the mark of the other items
          let dif = copy.map(ele=> ele[1] );
          // if mark we are checking for is found again ...
          if(dif.indexOf(mastMark) > -1 && mastMark!== undefined){
            console.log(`${mastMark} is about to win. Play ${openBox} to stop them`);
            masterReturn = {openBox:openBox[0],isTrue:true,path}
          }
        }).filter(obj => obj !== undefined );
      }
      function convert(a,b,c){
        let mark = this.props.appData.boxes.filter( obj=>a === obj.id )[0].mark;
        return [a,mark]
      }
    };
  },
  isCorner: function(box){
    return (this.props.boardState.corners.indexOf(box) > -1 )? true : false
  },
  getLastCorner: function(paths) {
    return (
      paths.map( getPathsCorners.bind(this) )
        .filter( a => a !== undefined )[0] // only need one ie: the first one
    )
    function getPathsCorners( pId ){
      let arr = this.props.appData.pathObj[pId].layout;
      return arr.filter(box => this.isCorner(box))[0]
      // only need one corner but all are returned
    }
  },
  getOpenCorner: function() {
    let boxes = this.props.appData.boxes;
    return this.props.boardState.corners.filter(cner => {
      // return the corner that is not checked
      return boxes.filter(a => a.id === cner)[0].checked === false;
    })[0]; // even if multiple open corners, any open one is fine thats why I choose 0 index
  },
  markBox: function(boxId,mark,colorClass){
    // setting variables for master app data
    let {boxes,pathObj}=this.props.appData;
    // set the box id to checked and give it a mark
    let box = boxes.filter( a => boxId === a.id)[0];
      box.checked = true;
      box.mark = mark;
      box.activeClassColor = colorClass;
    // add one to the each path that has a mark in it via the path object.marks property
    box.paths.map(a => {pathObj[a].marks++});

    // update master object with the new board info
    this.props.update({pathObj,boxes});


    let pId = this.state.id;
    // this.pushToHistory(box,mark);
  },
  computerChoice: function(){
    // this choice does not include the computers first move
    // however all the other computer moves come through here
    //deciding on computers next move
    let checkForTwo = this.twoInRow();
    if (checkForTwo.isTrue){
      return checkForTwo.openBox;
    } else if(this.getOpenCorner()){
      return this.getOpenCorner();
    } else {
      // go in open spot
    }

  },
  // check if any streaks in various paths function based on paths to check
  // view notes for applicable changes...
  checkForWinner: function(arr,event) {
    // check if there is a winner
  },
  render: function() {
    const s = this.state;
    let myBoxInfo = this.props.boxInfo;
    // if its checked render the box with the checked box inside
    if (this.props.boxInfo.checked){
      return (
        <div className={"box "+myBoxInfo.id+" "+myBoxInfo.bgColor}
        onClick={ this.makeMoves.bind(this,myBoxInfo.id)}>
          <div className={"mark-box" + " " + myBoxInfo.activeClassColor}>
            <svg className="mark-icon">
              <use xlinkHref={"#"+myBoxInfo.mark+"-mark"}></use>
            </svg>

          </div>
        </div>
      )
    }
    // else render the empty box
    else {
      return (
        <div className={"box "+myBoxInfo.id+" "+myBoxInfo.bgColor}
        onClick={ this.makeMoves.bind(this,myBoxInfo.id)}>
        </div>
      )
    }
  }
});

let ResetBtn = React.createClass({
  render: function(){
    return (
      <button id="reset-btn" onClick={this.props.reset}>
        <span id="reset-btn-text">Reset</span>
      </button>
    )
  }
})

React.render(<App/>,document.getElementById('main'))


// planning and working things out below ...
