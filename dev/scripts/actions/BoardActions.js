import {AppDispatcher} from "../dispatcher/app-dispatcher.js"
import {BoardStore} from "../stores/BoardStore.js";
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
    // manipulate data here and pass final compChoice to stores..

    /* ALL COMPUTER LOGIC Explained

      * if first move check..
        * if user picks corner - pick middle
        * else pick the first corner in paths
      * else if computer can win then make the winning move
      * else if user can win, make the defensive move
      * else if nowinning spot
        * if nobody holds middle go middle
        * if user holds middle go corner
        * if comp holds middle go non corner

    */

    let {storeData,boxInfo,} = data;

    if (storeData.firstMove) {
      storeData.firstMove = false;

      if (isCorner(data.boxId)){
        console.log('corner clicked setting boxToMark to mm');
        data.boxToMark = "mm";
      } else {
        data.boxToMark = getFirstCorner(boxInfo.paths);
      }
    } else {
      let winningCheck = ifTwoReturnWinningSpot(storeData.gameSigns.comp);
      if (winningCheck !== undefined) {
        data.boxToMark = winningCheck;
      } else {
        let defenseCheck = ifTwoReturnWinningSpot(storeData.gameSigns.user);
        if (defenseCheck !== undefined) {
          data.boxToMark = defenseCheck;
        } else {
          console.log('checking middle switch');
          switch(storeData.boxes.filter( box => box.id === "mm")[0].mark){
            case storeData.gameSigns.user:
              console.log('user is in middle');
              console.log(getOpenCorner());
              data.boxToMark = (!getOpenCorner())? getOpenEdge() : getOpenCorner();
              console.log(getOpenEdge());
              break;
            case storeData.gameSigns.comp:
              console.log("go in open edge");
              data.boxToMark = getOpenEdge();
              break;
            default:
              console.log('defaulting');
              data.boxToMark = "mm"
          }
        }
      }
    }

    function firstCompMove(userPickBoxId) {
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
    };
    function isCorner(ClickedBox){
      return (data.storeData.corners.indexOf(ClickedBox) > -1 )? true : false
    }
    function getFirstCorner(paths) {
      return (
        paths.map( getPathsCorners.bind(this) )
          .filter( a => a !== undefined )[0] // only need one ie: the first one
      )
      function getPathsCorners( pId ){
        let arr = data.storeData.pathObj[pId].layout;
        return arr.filter( box => isCorner(box))[0]
        // only need one corner but all are returned
      }
    }
    function getOpenEdge(){
      return storeData.middleEdges.filter(box => {
         return storeData.boxes.filter( a => a.id === box )[0].mark === undefined
      })[0];
    }
    function getOpenCorner(){
      return storeData.corners.filter( box => {
        return storeData.boxes.filter( a => a.id === box )[0].mark === undefined
      })[0];
    }
    function ifTwoReturnWinningSpot(mark) {
      let {boxes,pathObj} = data.storeData;
      let paths = Object.keys(pathObj);

      // check each path
      let test = paths.map( (path,i,arr)  => {
        // if less than three marks in path check it
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
      }).filter( id => id !== undefined )[0]
      return test;
    }

    AppDispatcher.handleViewAction({
      actionType: "makeComputerChoice",
      data
    });
  }
}

export {BoardActions};
