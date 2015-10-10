/* if I update the parent state of the board with set state, will that state be passed into the rendered box components... i think so
*/
let Page = React.createClass({
  render:function() {
    return (
      <Board/>
    )
  }
});

let Board = React.createClass({
  getInitialState: function(){
    // parent state that will stay on parent
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
    // this  will be mapped into appropriate components
    const boxes = [
      {id:"tl", paths:["1","4","7"], checked:false, mark:"x"},
      {id:"tm", paths:["2","4"], checked:false, mark:undefined},
      {id:"tr", paths:["3","4","8"], checked:false, mark:undefined},
      {id:"ml", paths:["1","5"], checked:false, mark:undefined},
      {id:"mm", paths:["2","5","7","8"], checked:false, mark:undefined},
      {id:"mr", paths:["3","5"], checked:false, mark:undefined},
      {id:"bl", paths:["1","6","8"], checked:false, mark:"x"},
      {id:"bm", paths:["2","6"], checked:false, mark:undefined},
      {id:"br", paths:["3","6","7"], checked:false, mark:undefined}
    ];
    // boxes in corners
    const corners = ["tl","tr","bl","br"];

    return {
      boxes,
      pathObj,
      corners,
      userIcon: false,
      firstMove: true
    }
  },
  update: function(obj){
    this.setState(obj);
    console.log(this.state.pathObj)
  },

  render:function() {
    return (
      <div className="board mdl-shadow--6dp">
        {this.state.boxes.map(function(obj){
          return <Box parentState={this.state} update={this.update} boxInfo={obj} />
        }.bind(this))}
        <h1></h1>
      </div>
    )
  }
});

let Box = React.createClass({
  getInitialState: function(){
    const attr = this.props;
    let { userIcon:icon, pathObj, corners, firstMove:fmove, boxes } = attr.parentState;

    let {id,paths,checked,mark} =  attr.boxInfo;

    return {
      id,
      paths,
      checked,
      mark,
      icon,
      pathObj,
      corners,
      fmove,
      boxes
    }

  },
  firstCompMove: function(userPick) {
    const s = this.state;
    if( this.isCorner(userPick) ){
      this.markBox("mm", "o");
    } else {
      var corner = this.getLastCorner(s.paths);
      this.markBox(corner, "o");
    }
    this.props.update({firstMove:false});
  },
  otherCompMoves: function(){
    // enter all the logic from onenote
  },
  twoInRow: function(){
    const allPaths = [1,2,3,4,5,6,7,8];
    allPaths.filter(checkPath.bind(this));
    console.log('**********************************************************************')

    function checkPath( path ) {
      // first ignore the paths that are not filled
      let p = this.state.pathObj[ path ];
      if ( p.marks < 3 ) {
        // return arr in this format [[box],[box],[box]]
        var arr = p.layout.map(convert.bind(this));
        var test = arr.map(function(a,b,c){
          // the mark of the double found
          let mast = a[1];
          // this is the open box in the path of the double
          let openBox = c.filter( ele => ele[1] !== a[1])[0]
          let copy = c.slice(0);
          copy.splice(b,1);
          let dif = copy.map(ele=>ele[1]);
          if(dif.indexOf(mast) > -1 && mast!== undefined){
            console.log(`${mast} is about to win. Play ${openBox} to stop them`);
            return {match:true,mark:mast,openBox,path}
          } else {return "no match for this one",a[0]}
        }).filter(obj => obj !== undefined);
        console.log("test",test);
      }
      function convert(a,b,c){
        let mark = this.state.boxes.filter( obj=>a === obj.id )[0].mark;
        return [a,mark]
      }
    };
  },
  isCorner: function(box){
    return (this.state.corners.indexOf(box) > -1 )? true : false
  },
  getLastCorner: function(paths) {
    return (
      paths.map( getPathsCorners.bind(this) )
        .filter( isDefined )[0]
        // only need one ie: the first one
    )
    function getPathsCorners( pId ){
      let arr = this.state.pathObj[pId].layout;
      return arr.filter(firstCorner.bind(this))[0]
      // only need one corner but all are returned
    }
    function isDefined(a){
      return a !== undefined;
    }
    function firstCorner(box) {
      return this.isCorner(box)
    }
  },
  markBox: function(box,mark){
    console.log("compGoes:",box,mark);
    let pId = this.state.id;
    this.pushToHistory(box,mark);
  },
  pushToHistory: function(box,mark) {
    let s = this.state;
    s.paths.map(record.bind(this));
    function record(path){
      // update is checked for certain boxes;
    }
    this.setState( {pathObj:s.pathObj} );
    this.props.update( {pathObj:s.pathObj} );
  },
  // push User icon to paths
  assignMarkToPaths: function(arr,mark,event){
    let boardPaths = this.state.boardPaths;

    arr.map(function(pathId){
      this.state.boardPaths[pathId].push(mark)
    }.bind(this));

    this.setState({boardPaths});
    this.props.update({boardPaths});
  },
  // push computer icon to path
  computerChoice: function(){
    // check paths of previous mark
  },
  // check if any streaks in various paths function based on paths to check
  // view notes for applicable changes...
  checkPaths: function(arr,event) {

    let set = arr.map(function(pathId){

      let pathArr = this.state.boardPaths[pathId];

      if (check3InRow(pathArr)) {
        console.log(`${pathArr[0].toUpperCase()}'s Won on path`,pathId)
      }

      return check3InRow(pathArr);
    });
    // possible mixin used ...
    function check3InRow(arr) {
      let match = true;
      if(arr.length > 2 ) {
        arr.reduce(function(acc,val){
          if(acc !== val){
              match = false;
          }
          return val;
        });
      }
      return match;
    }

    return set;
  },
  render: function() {
    this.twoInRow();
    const s = this.state;
    return (
      <div className={"box "+s.id} onClick={
        this.firstCompMove.bind(this,s.id)
      }></div>
    )
  }
});

React.render(<Page/>,document.body)


// planning and working things out below ...
